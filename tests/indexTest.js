var alltested = require('../index'),
    fs = require('fs'),
    path = require('path');

module.exports = {
    index: {
        "Test the tester": function(test){
            alltested(__dirname);
            
            test.done();
        },    
        
        "Ensure this works": function(test){
            var appPath = path.join(__dirname, '/mockApp1');
            
            alltested(appPath, path.join(appPath, '/tests'), {
                ignore: ["iDontNeedTests.js"]
            });
            
            test.done();
        },
        
        "Will throw exception in case there is no test file for a module": function(test){
            var appPath = path.join(__dirname, '/mockApp2');
            
            test.ok(fs.existsSync(path.join(appPath, 'notSoAwesome.js')));  
            test.ok(!fs.existsSync(path.join(appPath, '/tests/notSoAwesomeTest.js')));
            
            test.throws(function(){
                alltested(appPath, path.join(appPath, '/tests'));
            });
            
            test.done();
        },
        
        "Will throw exception in case there is no test case for a module property": function(test){
            var appPath = path.join(__dirname, '/mockApp3');
            
            test.ok(fs.existsSync(path.join(appPath, 'foo.js')));  
            test.ok(fs.existsSync(path.join(appPath, '/tests/fooTest.js')));
            
            test.throws(function(){
                alltested(appPath, path.join(appPath, '/tests'));
            });
            
            test.done();
        }
    }
};