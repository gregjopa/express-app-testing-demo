const jsonpHelper = require('../../app/jsonp_helper');

describe('parseJSONP(jsonpData)', () => {
  test('should parse valid jsonp data', () => {
    const jsonpData = 'jsonFlickrFeed({"title": "tagged california"});';
    const jsObject = jsonpHelper.parseJSONP(jsonpData);
    expect(jsObject).toMatchObject({
      title: 'tagged california'
    });
  });

  test('should parse jsonp data with escaped single quotes', () => {
    const jsonpData =
      'jsonFlickrFeed({"title": "tagged california\'s coast"});';
    const jsObject = jsonpHelper.parseJSONP(jsonpData);
    expect(jsObject).toMatchObject({
      title: "tagged california's coast"
    });
  });

  test('should throw error when parsing invalid jsonp data', () => {
    // invalid json because of missing double quotes around title value
    const jsonpData = 'jsonFlickrFeed({"title": tagged california});';

    expect(function() {
      // call the add(item) method without passing in an item
      jsonpHelper.parseJSONP(jsonpData);
    }).toThrowError(/Failed to convert jsonp to json/);
  });
});
