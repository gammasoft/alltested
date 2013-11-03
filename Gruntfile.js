var fs = require('fs');

module.exports = function(grunt) {

    grunt.initConfig({
        nodeunit : {
            all : ['tests/*.js']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'index.js',
                'tests/**/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'onevar': true,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);
};