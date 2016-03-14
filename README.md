# BG-UI

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


Build steps :
============

Initial cmd
npm install grunt-karma karma karma-phantomjs-launcher karma-jasmine jasmine-core phantomjs-prebuilt --save-dev

1. npm install

2. bower install

3. grunt

4. grunt serve

5. grunt test to run tests


Notes :
=======
- Updated bowerrc to create bower components in app folder.


Todo 
====
1. Need to add shrinkwrap


Required Sublime plugins
========================
git
html5
sass beautify
javascript beautify

--Bower configurations : .bowerrc, bower.json



Grunt definitions :
==================

1. time-grunt :
Display the elapsed execution time of grunt tasks

2. jit-grunt : 
Auto task loader along with manual mapping for custom tasks as tasks with names do not match with generic naming conventions

Eg :

clean           -> node_modules/grunt-contrib-clean
wget            -> node_modules/grunt-wget
mochaTest       -> node_modules/grunt-mocha-test
mocha_phantomjs -> node_modules/grunt-mocha-phantomjs
assemble        -> node_modules/assemble

Custom plugins directory :

require('jit-grunt')(grunt)({
  pluginsRoot: 'other/dir'
}); 

