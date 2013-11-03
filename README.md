alltested
=========

[![NPM](https://nodei.co/npm/alltested.png)](https://nodei.co/npm/alltested/)

[![Build Status](https://travis-ci.org/gammasoft/alltested.png?branch=master)](https://travis-ci.org/gammasoft/alltested)

**Ensures that every method within every .js file has a correponding test. Works with [nodeunit](https://github.com/caolan/nodeunit) tests.**

By adopting the convention that every `*.js` file should have a corresponding `*Test.js` file, 
and that every property exposed via `module.exposts` in any `*.js` file should also be a property of
`*Test.js` *alltested* can help you not forgetting to write new tests for every new module. 
Also helps in standardization of tests and project's folder structure.

The correctness of the test is of course up to you.

### Installation

```bash
npm install --save alltested
```

### Usage

Call `alltested` from within one of your tests.

**alltested(appDirectory[, testsDirectory][, options]);**

- appDirectory: the path where your app files are at
- testsDirectory: the path where *alltested* will look for your test files
- options: a hash with options. Example above (more options will be added later).

```javascript
var options = {
  ignore: [ 
    /(.*)-ignore-me.js/i, //ignore file when regexp.test(filePath) === true
    'iDontNeedToBeTested.js' //ignore file when filePath.indexOf(string) !== -1
  ] 
};
```

### Usage Example

Some examples below, should you still have any doubt try cheking [some more examples here](https://github.com/gammasoft/alltested/blob/master/tests/indexTest.js)!

Given this folder structure...

```bash
projectFolder
|
+--- tests
|    |
|    +-- stringHelperTest.js
|    +-- foo
|        |
|        +-- bar.js
|
+--- stringHelper.js
+--- foo
|    |
|    +-- bar.js
|
+--- big
     |
     +-- bang.js
```

...this code will work!

```javascript
var alltested = require("alltested");

module.exports = {
  "Ensure all is tested": function(test){
    alltested(__dirname, {
      ignore: ['big/bang.js']
    });     
    
    test.done();
  }
}

```

**TIP:** You can play with `__dirname` and node's native `path.resolve` and `path.join` to be able to use *alltested* with diverse folder structures!

-------------------------------------

**Any further question/bugs/etc, please head straight to the [issues page](https://github.com/gammasoft/alltested/issues). You know the drill!**

### License MIT
