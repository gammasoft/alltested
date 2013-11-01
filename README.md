alltested
=========

Ensures every method within every .js file has a correponding test

### Installation

```bash
npm install --save alltested
```

### Usage

Take a look at the nodeunit test below, should you still have any doubt try cheking [some more examples here](https://github.com/gammasoft/alltested/blob/master/tests/indexTest.js)!

```javascript
var alltested = require("alltested");

module.exports = {
  "Ensure all is tested": function(test){
    alltested(__dirname);     
    //this assumes your app is at __dirname + "/.." and that all your tests should stay at __dirname
    //if this is not your case you may go like this:
    
    var appFolder = __dirname + "/../app",
        testFolder = __dirname + "/../tests";
    
    alltested(appFolder, testFolder);
    
    //You can still pass a third (or second) parameter specifying files that should be skipped:
    alltested(appFolder, testFolder, {
      ignore: [
        "noTestForMePlease.js",
        /wildRegExpForLotsOfFilesThatDontNeedTesting/i
      ];
    });
    
    test.done();
  }
}

```

### License MIT
