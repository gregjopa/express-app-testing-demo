const got = require('got');
const querystring = require('querystring');
const jsonpHelper = require('../app/jsonp_helper');

class API {
  constructor({ tags = '', tagmode = '', format = 'json' }) {
    const qs = querystring.stringify({ tags, tagmode, format });
    this.hostname = 'api.flickr.com';
    this.path = `/services/feeds/photos_public.gne?${qs}`;
  }
}

describe('flickr public feed api', () => {
  test('should return expected json format', () => {
    const apiTest = new API({
      tags: 'california',
      tagmode: 'all'
    });

    return got(apiTest).then(response => {
      expect(response.statusCode).toBe(200);

      const photoFeed = jsonpHelper.parseJSONP(response.body);
      expect(photoFeed).toHaveProperty('items');

      const photos = photoFeed.items;
      expect(photos).toBeInstanceOf(Array);

      photos.forEach(function(photo) {
        expect(Object.keys(photo)).toEqual(
          expect.arrayContaining([
            'title',
            'link',
            'media',
            'date_taken',
            'description',
            'published',
            'author',
            'author_id',
            'tags'
          ])
        );
      });
    });
  });

  test('should return many photos', () => {
    const apiTest = new API({
      tags: 'california, beach, blue',
      tagmode: 'any'
    });

    return got(apiTest).then(response => {
      expect(response.statusCode).toBe(200);

      const photoFeed = jsonpHelper.parseJSONP(response.body);
      expect(photoFeed).toHaveProperty('items');

      const photos = photoFeed.items;
      expect(photos.length).toBeGreaterThan(0);
    });
  });

  test('should return zero photos', () => {
    // these tags should return zero results
    const apiTest = new API({
      tags: 'bad,parameters,abc,111,999',
      tagmode: 'all'
    });

    return got(apiTest).then(response => {
      expect(response.statusCode).toBe(200);

      const photoFeed = jsonpHelper.parseJSONP(response.body);
      expect(photoFeed).toHaveProperty('items');

      const photos = photoFeed.items;
      expect(photos.length).toBe(0);
    });
  });
});
