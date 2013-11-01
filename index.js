var fs = require('fs'),
    path = require('path'),
    assert = require('assert');

module.exports = function(appPath, testsPath, options){
    if( typeof options === "undefined" ) {
        options = { };
    }
    
    readDirectoryRecursively(appPath, options, function(modulePath){
        if( modulePath.indexOf(testsPath) !== -1 ) return;
        
        var moduleExtension = path.extname(modulePath),
            testPath = path.join(testsPath, modulePath.replace(appPath, '').replace(moduleExtension, 'Test' + moduleExtension));
        
        ensureModuleExistsAndHaveAllTheTests(appPath, modulePath, testPath);
    });
};

function ensureModuleExistsAndHaveAllTheTests(appPath, modulePath, testPath) {
    assert.ok(fs.existsSync(testPath), 'No test was found for module "' + modulePath + '". File expected: ' + testPath);
    
    var moduleName = modulePath.replace(appPath, ''),
        module = require(modulePath),
        test = require(testPath);
    
    if( typeof module === "object" && !Array.isArray(module)) {
        for ( var property in module ) {
            if ( module.hasOwnProperty(property) ) {
                assert.ok(property in test, 'No tests found for "' + property + '" from "' + moduleName + '" in "' + testPath + '"');
            } 
        }
    } else {
        var mainTestName = path.basename(modulePath, path.extname(modulePath));
        assert.ok(mainTestName in test, 'Module "' + moduleName + '" does not expose a function, in this case a test named "' + mainTestName + '" is required');
    }
}

function readDirectoryRecursively(directoryPath, options, callback){
    var contents = fs.readdirSync(directoryPath);
    
    contents.forEach(function(content){
        var contentPath = path.join(directoryPath, content);
        
        if( fs.lstatSync(contentPath).isDirectory() ) {
            readDirectoryRecursively(contentPath, options, callback);
        } else if ( shouldBeValidated(contentPath, options) ) {
            callback(contentPath);
        }
    });
}

function shouldBeValidated(filePath, options) {
    return path.extname(filePath) === '.js';
}