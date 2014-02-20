# express-app-testing-demo

This is a simple express.js app for demonstrating testing and code coverage.
[Mocha](http://visionmedia.github.io/mocha/) and
[Supertest](https://github.com/visionmedia/supertest) are used for unit and integration testing.
[Istanbul](http://gotwarlost.github.io/istanbul/) is used for viewing code coverage. Note that this
app only focuses on server-side JavaScript testing.


## Requirements

* Node.js - [http://nodejs.org](http://nodejs.org)
* Grunt.js - run `sudo npm install -g grunt-cli`


## Getting Started

* Clone the repo
* Install dependencies with `npm install`
* Run development server with `grunt` and go here:
[http://localhost:3000/](http://localhost:3000/)


## Running Tests

* Run all tests: `grunt test`
* Run unit tests: `grunt mochaTest:unit`
* Run route tests: `grunt mochaTest:route`
* Run api tests: `grunt mochaTest:api`


## Running Code Coverage Report

Build the code coverage report with `grunt coverage`.
