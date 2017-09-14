var request = require('request');
var jsonpHelper = require('../../app/jsonp_helper');


function API (params) {
  this.uri = 'http://api.flickr.com/services/feeds/photos_public.gne';
  this.qs = {
    tags: params.tags || '',
    tagmode: params.tagmode || '',
    format: params.format || 'json'
  };
}


describe('flickr public feed api', () => {


  test('should return expected json format', done => {

    var apiTest = new API({
      tags: 'california',
      tagmode: 'all'
    });

    request.get(apiTest, function (error, response, body) {

      expect(response.statusCode).toBe(200);

      var json = jsonpHelper.parseJSONP(body);
      expect(json).toHaveProperty('items');

      var photos = json.items;
      expect(photos).toBeInstanceOf(Array);

      photos.forEach(function (photo) {

        expect(Object.keys(photo)).toEqual(expect.arrayContaining([
          'title',
          'link',
          'media',
          'date_taken',
          'description',
          'published',
          'author',
          'author_id',
          'tags'
        ]));

      });

      done();

    });

  });


  test('should return many photos', done => {

    var apiTest = new API({
      tags: 'california, beach, blue',
      tagmode: 'any'
    });

    request.get(apiTest, function (error, response, body) {

      expect(response.statusCode).toBe(200);

      var json = jsonpHelper.parseJSONP(body);
      expect(json).toHaveProperty('items');

      var photos = json.items;
      expect(photos.length).toBeGreaterThan(0);

      done();

    });

  });


  test('should return zero photos', done => {

    // these tags should return zero results
    var apiTest = new API({
      tags: 'bad,parameters,abc,111,999',
      tagmode: 'all'
    });

    request.get(apiTest, function (error, response, body) {

      expect(response.statusCode).toBe(200);

      var json = jsonpHelper.parseJSONP(body);
      expect(json).toHaveProperty('items');

      var photos = json.items;
      expect(photos.length).toBe(0);

      done();

    });

  });


});
