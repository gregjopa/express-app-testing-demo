/* jshint expr: true */

var should = require('should');
var nock = require('nock');
var requireHelper = require('../require_helper');
var photoModel = requireHelper('photo_model');


describe('form_validator.js', function () {


  describe('getFlickrPhotos(tags, tagmode, callback)', function () {


    it('should return photos', function () {

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


      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        error.should.not.be.ok;
        photos.should.be.an.instanceOf(Object);
        photos.length.should.be.above(0);
        photos[0].should.have.properties('title', 'media');
        photos[0].media.should.have.properties('t', 'm', 'b');

      });

    });


    it('should error when api returns 500 http status code', function () {

      // mock the flickr public feed api endpoint and return a 500 error
      var flickrFeedApi = nock('http://api.flickr.com')
        .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
        .reply(500);

      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        should.exist(error);
        error.should.match(/Flickr public feed api error/);
        should.not.exist(photos);

      });

    });


    it('should error with invalid jsonp data', function () {

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

      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        should.exist(error);
        error.should.match(/Flickr public feed api error/);
        should.not.exist(photos);

      });

    });


  });


  describe('parseJSONP(jsonpData)', function () {


    it('should parse valid jsonp data', function () {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california"});';
      var jsObject = photoModel.parseJSONP(jsonpData);
      jsObject.should.be.an.instanceOf(Object).and.have.property('title', 'tagged california');

    });


    it('should parse jsonp data with escaped single quotes', function () {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california\'s coast"});';
      var jsObject = photoModel.parseJSONP(jsonpData);
      jsObject.should.be.an.instanceOf(Object).and.have.property('title', "tagged california's coast");

    });


    it('should throw error when parsing invalid jsonp data', function () {

      // invalid json because of missing double quotes around title value
      var jsonpData = 'jsonFlickrFeed({"title": tagged california});';

      (function () {
        // call the add(item) method without passing in an item
        photoModel.parseJSONP(jsonpData);
      }).should.throw(/^Error coverting jsonp to json/);

    });


  });


});
