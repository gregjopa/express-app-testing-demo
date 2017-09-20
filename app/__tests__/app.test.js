const request = require('supertest');

jest.mock('../../app/photo_model');
const app = require('../../app/server');

describe('index route', () => {
  afterEach(() => {
    app.server.close();
  });

  test('should respond with a 200 with no query parameters', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  test('should respond with a 200 with valid query parameters', done => {
    request(app)
      .get('/?tags=california&tagmode=all')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/<div class="panel panel-default search-results">/, done);
  });

  test('should respond with a 200 with invalid query parameters', done => {
    request(app)
      .get('/?tags=california123&tagmode=all')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/<div class="alert alert-danger">/, done);
  });

  test('should respond with a 500 error due to bad jsonp data', done => {
    request(app)
      .get('/?tags=error&tagmode=all')
      .expect(500, done);
  });
});
