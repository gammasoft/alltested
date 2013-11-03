'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    assert = require('assert');

function ensureModuleExistsAndHaveAllTheTests(appPath, modulePath, testPath) {
    assert.ok(fs.existsSync(testPath), 'No test was found for module "' + modulePath + '". File expected: ' + testPath);
    
    var moduleName = modulePath.replace(appPath, ''),
        module = require(modulePath),
        test = require(testPath),
        property,
        mainTestName;
    
    if( typeof module === 'object' && !Array.isArray(module)) {
        for ( property in module ) {
            if ( module.hasOwnProperty(property) ) {
                assert.ok(property in test, 'No tests found for "' + property + '" from "' + moduleName + '" in "' + testPath + '"');
            }
        }
    } else {
        mainTestName = path.basename(modulePath, path.extname(modulePath));
        assert.ok(mainTestName in test, 'Module "' + moduleName + '" does not expose an object, in this case a test named "' + mainTestName + '" is required');
    }
}

function shouldBeValidated(filePath, options) {
    var shouldBeIgnored = options.ignore.some(function(ignore){
        if(util.isRegExp(ignore)) {
            return ignore.test(filePath);
        }
        
        return filePath.indexOf(ignore) !== -1;
    });
    
    return !shouldBeIgnored && path.extname(filePath) === '.js';
}

function readDirectoryRecursively(directoryPath, options, callback){
    var contents = fs.readdirSync(directoryPath);
    
    contents.forEach(function(content){
        var contentPath = path.join(directoryPath, content);
        
        if( fs.lstatSync(contentPath).isDirectory() && contentPath.indexOf('node_modules') === -1) {
            readDirectoryRecursively(contentPath, options, callback);
        } else if ( shouldBeValidated(contentPath, options) ) {
            callback(contentPath);
        }
    });
}

function parseOptions(options) {
    if(typeof options === 'undefined') {
        options = {};
    }
    
    var defaults = {
        ignore: options.ignore || []
    };
    
    return defaults;
}

module.exports = function(appPath, testsPath, options){
    if ( typeof testsPath === 'object' ) {
        options = testsPath;
        testsPath = undefined;
    }
    
    if ( typeof testsPath === 'undefined' ) {
        testsPath = appPath;
        appPath = path.resolve(path.join(testsPath, '/..'));
    }
    
    options = parseOptions(options);
    
    readDirectoryRecursively(appPath, options, function(modulePath){
        if( modulePath.indexOf(testsPath) !== -1 ) {
            return;
        }
        
        var moduleExtension = path.extname(modulePath),
            testPath = path.join(testsPath, modulePath.replace(appPath, '').replace(moduleExtension, 'Test' + moduleExtension));
        
        ensureModuleExistsAndHaveAllTheTests(appPath, modulePath, testPath);
    });
};