# MetaTags https://img.shields.io/travis/thiagofesta/tf-metatags.svg

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
