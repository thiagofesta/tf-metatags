# MetaTags 

[ ![Codeship Status for thiagofesta/tf-metatags](https://img.shields.io/codeship/af075410-1dd6-0133-13c3-0a18ce4642f2.svg)](https://codeship.com/projects/95120) [![codecov.io](https://img.shields.io/codecov/c/github/thiagofesta/tf-metatags.svg)](http://codecov.io/github/thiagofesta/tf-metatags?branch=master) [![bower.io](https://img.shields.io/bower/v/tf-metatags.svg)](http://bower.io/search/?q=tf-metatags)  [![npm](https://img.shields.io/npm/v/tf-metatags.svg)](https://www.npmjs.com/package/tf-metatags) 

Angular module for providing MetaTags support based on routes.

## Testing

First you need to install the dependencies

    npm install

Now you are able to have the server up and runing. Go and start the server

    grunt server
  

### Running tests

We have JSHint, Unit tests and E2E tests.
 
All of them can be run once using the following command
  
    grunt test
  
You can see the coverage on the command line output or more details opening the `test/coverage/index.html` file on your browser.

  
##### Running JSHint

For running JSHint

    grunt test:jshint
  

##### Running Unit Tests

For running unit tests

    grunt test:unit
  
  
##### Running E2E Tests

For running E2E

    grunt test:e2e
  

### Building

For create a build run

    grunt build
  
This task will also make sure all tests are passing before making the build.
