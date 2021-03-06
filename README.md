# grunt-jasmine-webpack

> Build and run jasmine specs using webpack

Heavily inspired by the excellent [grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine).

## Getting started

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jasmine-webpack --save-dev
```
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```shell
grunt.loadNpmTasks('grunt-jasmine-webpack');
```

## Jasmine Webpack task

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### specRunnerDest

Type: `String`

The location and file name of the spec runner generated. Defaults to `./_SpecRunner.html`.

#### keepRunner

Type: `Boolean`

Whether or not to keep the spec runner file once the process has finished. Defaults to `false`.

This is useful if you need to see any output from the console. You can open the spec runner file in a browser.

#### norun

Type: `Boolean`

Whether or not to run the tests in phantomjs after the webpack build. If this is `true`, `options.keepRunner` will be set to `true` as well. This is useful for combining with (grunt-contrib-connect)[https://github.com/gruntjs/grunt-contrib-connect] to run the tests in a browser.

Defaults to `false`.

#### helpers

Type: `Array<String>`

Helper files to include in the spec runner.

#### vendor

Type: `Array<String>`

Vendor files to include in the spec runner.

#### polyfills

Type: `Array<String>`

Polyfill files to include in the spec runner.

#### webpack

Type: `Object`

Config for webpack, defaults:

```javascript
{
    devtool: 'eval',
    output: {
        path: '.grunt/grunt-jasmine-webpack/specs',
        filename: '[name].js',
        libraryTarget: 'var'
    }
}
```

#### styles

Type: `Array<String>`

CSS stylesheets to include in the spec runner.

### Usage examples

```javascript
jasmine_webpack: {
    main: {
        options: {
            specRunnerDest: '_test/SpecRunner.html',
            webpack: {
                module: {
                    loaders: [{ test: /\.jsx$/, 'jsx' }]
                },
                resolve: {
                    modulesDirectories: ['_test/js']
                }
            },
            keepRunner: true,
            vendor: ['path/to/vendor/file.js'],
            styles: ['path/to/css/styles.css']
        },
        src: './src/js/test/**/*.test.js'
    }
}
```

## Known issues

* There is a known problem that sometimes phantomjs doesn't exit cleanly, causing the task to fail. Haven't had enough time to properly look into that, but pull requests are welcome :)

## TODO

* Unit tests
* Figure out why phantomjs doesn't exit cleanly all the time

## Release History

* 2015-06-24    v0.2.0    Adds norun option and npm installation instructions to README.
* 2015-06-20    v0.1.0    Initial release.
