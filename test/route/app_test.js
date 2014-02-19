var request = require('supertest');
var requireHelper = require('../require_helper');
var app = requireHelper('app');
var nock = require('nock');


describe('index route', function () {


  it('should respond with a 200 with no query parameters', function (done) {

    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);

  });


  it('should respond with a 200 with valid query parameters', function (done) {

    // mock the flickr public feed api endpoint
    var jsonpData = 'jsonFlickrFeed({"items": [' +
      '{ "title": "Boating",' +
        '"media": {"m":"http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"} },' +
      '{ "title": "Signs",' +
        '"media": {"m":"http://farm8.staticflickr.com/7446/12608714423_efaf73400c_m.jpg"} }' +
      ']})';

    var flickrFeedApi = nock('http://api.flickr.com')
      .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
      .reply(200, jsonpData);

    request(app)
      .get('/?tags=california&tagmode=all')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/<div class="panel panel-default search-results">/, done);

  });


  it('should respond with a 200 with invalid query parameters', function (done) {

    request(app)
      .get('/?tags=california123&tagmode=all')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/<div class="alert alert-danger">/, done);

  });


  it('should respond with a 500 error due to bad jsonp data', function (done) {

    // mock the flickr public feed api endpoint with invalid jsonp data that's missing parentheses
    var jsonpData = 'jsonFlickrFeed{"items": [' +
      '{ "title": "Boating",' +
        '"media": {"m":"http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"} },' +
      '{ "title": "Signs",' +
        '"media": {"m":"http://farm8.staticflickr.com/7446/12608714423_efaf73400c_m.jpg"} }' +
      ']}';

    var flickrFeedApi = nock('http://api.flickr.com')
      .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
      .reply(200, jsonpData);

    request(app)
      .get('/?tags=california&tagmode=all')
      .expect(500, done);

  });


});
