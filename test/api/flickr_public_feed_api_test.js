var should = require('should');
var request = require('request');
var requireHelper = require('../require_helper');
var jsonpHelper = requireHelper('jsonp_helper');


function API (params) {
  this.uri = 'http://api.flickr.com/services/feeds/photos_public.gne';
  this.qs = {
    tags: params.tags || '',
    tagmode: params.tagmode || '',
    format: params.format || 'json'
  };
}


describe('flickr public feed api', function () {


  it('should return expected json format', function (done) {

    var apiTest = new API({
      tags: 'california',
      tagmode: 'all'
    });

    request.get(apiTest, function (error, response, body) {

      response.statusCode.should.equal(200, 'Invalid http status code');

      var json = jsonpHelper.parseJSONP(body);
      json.should.have.property('items');

      var photos = json.items;
      photos.should.be.an.instanceOf(Array);

      photos.forEach(function (photo) {

        photo.should.have.keys(
          'title',
          'link',
          'media',
          'date_taken',
          'description',
          'published',
          'author',
          'author_id',
          'tags'
        );

      });

      done();

    });

  });


  it('should return many photos', function (done) {

    var apiTest = new API({
      tags: 'california, beach, blue',
      tagmode: 'any'
    });

    request.get(apiTest, function (error, response, body) {

      response.statusCode.should.equal(200, 'Invalid http status code');

      var json = jsonpHelper.parseJSONP(body);
      json.should.have.property('items');

      var photos = json.items;
      photos.length.should.be.above(0);

      done();

    });

  });


  it('should return zero photos', function (done) {

    // these tags should return zero results
    var apiTest = new API({
      tags: 'bad,parameters,abc,111,999',
      tagmode: 'all'
    });

    request.get(apiTest, function (error, response, body) {

      response.statusCode.should.equal(200, 'Invalid http status code');

      var json = jsonpHelper.parseJSONP(body);
      json.should.have.property('items');

      var photos = json.items;
      photos.length.should.equal(0);

      done();

    });

  });


});
