var nock = require('nock');
var requireHelper = require('../require_helper');
var photoModel = requireHelper('photo_model');


describe('photo_model.js', () => {


  describe('getFlickrPhotos(tags, tagmode, callback)', () => {


    test('should return photos', () => {

      // mock the flickr public feed api endpoint
      var jsonpData = 'jsonFlickrFeed({"items": [' +
        '{ "title": "Boating",' +
          '"media": {"m":"http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"} },' +
        '{ "title": "Signs",' +
          '"media": {"m":"http://farm8.staticflickr.com/7446/12608714423_efaf73400c_m.jpg"} }' +
        ']})';

      // eslint-disable-next-line no-unused-vars
      var flickrFeedApi = nock('http://api.flickr.com')
        .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
        .reply(200, jsonpData);


      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        if (error !== null) {
          expect(error).toBeFalsy();
        }
        expect(photos).toBeInstanceOf(Object);
        expect(photos.length).toBeGreaterThan(0);
        expect(photos[0]).to.have.properties('title', 'media');
        expect(photos[0].media).to.have.properties('t', 'm', 'b');

      });

    });


    test('should error when api returns 500 http status code', () => {

      // mock the flickr public feed api endpoint and return a 500 error
      // eslint-disable-next-line no-unused-vars
      var flickrFeedApi = nock('http://api.flickr.com')
        .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
        .reply(500);

      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        expect(error).toBeDefined();
        expect(error).toMatch(/Flickr public feed api error/);
        expect(photos).toBeFalsy();

      });

    });


    test('should error with invalid jsonp data', () => {

      // mock the flickr public feed api endpoint with invalid jsonp data that's missing parentheses
      var jsonpData = 'jsonFlickrFeed{"items": [' +
        '{ "title": "Boating",' +
          '"media": {"m":"http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"} },' +
        '{ "title": "Signs",' +
          '"media": {"m":"http://farm8.staticflickr.com/7446/12608714423_efaf73400c_m.jpg"} }' +
        ']}';

      // eslint-disable-next-line no-unused-vars
      var flickrFeedApi = nock('http://api.flickr.com')
        .get('/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json')
        .reply(200, jsonpData);

      photoModel.getFlickrPhotos('california', 'all', function (error, photos) {

        expect(error).toBeDefined();
        expect(error).toMatch(/Flickr public feed api error/);
        expect(photos).toBeFalsy();

      });

    });


  });


});
