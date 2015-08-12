# MetaTags 

[ ![Codeship Status for thiagofesta/tf-metatags](https://codeship.com/projects/af075410-1dd6-0133-13c3-0a18ce4642f2/status?branch=master)](https://codeship.com/projects/95120)

[![Build Status TravisCI](https://img.shields.io/travis/thiagofesta/tf-metatags.svg)](https://travis-ci.org/thiagofesta/tf-metatags)

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
