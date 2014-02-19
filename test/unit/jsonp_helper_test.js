/* jshint expr: true */

var should = require('should');
var requireHelper = require('../require_helper');
var jsonpHelper = requireHelper('jsonp_helper');


describe('jsonp_helper.js', function () {


  describe('parseJSONP(jsonpData)', function () {


    it('should parse valid jsonp data', function () {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california"});';
      var jsObject = jsonpHelper.parseJSONP(jsonpData);
      jsObject.should.be.an.instanceOf(Object).and.have.property('title', 'tagged california');

    });


    it('should parse jsonp data with escaped single quotes', function () {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california\'s coast"});';
      var jsObject = jsonpHelper.parseJSONP(jsonpData);
      jsObject.should.be.an.instanceOf(Object).and.have.property('title', "tagged california's coast");

    });


    it('should throw error when parsing invalid jsonp data', function () {

      // invalid json because of missing double quotes around title value
      var jsonpData = 'jsonFlickrFeed({"title": tagged california});';

      (function () {
        // call the add(item) method without passing in an item
        jsonpHelper.parseJSONP(jsonpData);
      }).should.throw(/^Error coverting jsonp to json/);

    });


  });


});
