# express-app-testing-demo

This project is a simple express app for demonstrating testing and code coverage.
[Jest](https://facebook.github.io/jest/) and
[Supertest](https://github.com/visionmedia/supertest) are used for testing.
Jest is also used for mocking functions and measuring code coverage.
Note that this app only focuses on server-side JavaScript testing.


## Requirements

* Node.js - [https://nodejs.org/](https://nodejs.org/)


## Getting Started

* Clone the repo
* Install dependencies with `npm install`
* Run server with `npm start` and go here:
[http://localhost:3000/](http://localhost:3000/)


## Running Tests

* Run unit and integration tests: `npm test`
* Run end-to-end tests: `npm run test:e2e`

## Code Coverage Report

A new code coverage report is generated every time `npm test` runs.
Normally this coverage report is ignored by git.
This project includes it in source control so the coverage report can be viewed in the demo app:
[http://express-app-testing-demo.herokuapp.com/coverage/lcov-report/index.html](http://express-app-testing-demo.herokuapp.com/coverage/lcov-report/index.html)
