var jsonpHelper = require('../../app/jsonp_helper');


describe('jsonp_helper.js', () => {


  describe('parseJSONP(jsonpData)', () => {


    test('should parse valid jsonp data', () => {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california"});';
      var jsObject = jsonpHelper.parseJSONP(jsonpData);
      expect(jsObject).toMatchObject({
        title: 'tagged california'
      });

    });


    test('should parse jsonp data with escaped single quotes', () => {

      var jsonpData = 'jsonFlickrFeed({"title": "tagged california\'s coast"});';
      var jsObject = jsonpHelper.parseJSONP(jsonpData);
      expect(jsObject).toMatchObject({
        title: "tagged california's coast"
      });
    });


    test('should throw error when parsing invalid jsonp data', () => {

      // invalid json because of missing double quotes around title value
      var jsonpData = 'jsonFlickrFeed({"title": tagged california});';

      expect(function () {
        // call the add(item) method without passing in an item
        jsonpHelper.parseJSONP(jsonpData);
      }).toThrowError(/^Error coverting jsonp to json/);

    });


  });


});
