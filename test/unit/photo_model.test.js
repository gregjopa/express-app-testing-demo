const nock = require('nock');
const photoModel = require('../../app/photo_model');

describe('photo_model.js', () => {
  describe('getFlickrPhotos(tags, tagmode, callback)', () => {
    test('should return photos', () => {
      // mock the flickr public feed api endpoint
      const jsonpData = `jsonFlickrFeed({
        "items": [
          {
            "title": "Boating",
            "media": {
              "m": "http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"
            }
          },
          {
            "title": "Signs",
            "media": {
              "m": "http://farm8.staticflickr.com/7446/12608714423_efaf73400c_m.jpg"
            }
          }
        ]
      })`;

      // eslint-disable-next-line no-unused-vars
      const flickrFeedApi = nock('http://api.flickr.com')
        .get(
          '/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json'
        )
        .reply(200, jsonpData);

      const expectedSubset = [
        {
          title: 'Boating',
          media: {
            t: expect.stringMatching(/t.jpg/),
            m: expect.stringMatching(/m.jpg/),
            b: expect.stringMatching(/b.jpg/)
          }
        }
      ];

      return photoModel.getFlickrPhotos('california', 'all').then(photos => {
        expect(photos).toEqual(expect.arrayContaining(expectedSubset));
      });
    });

    test('should error when api returns 500 http status code', () => {
      // mock the flickr public feed api endpoint and return a 500 error
      // eslint-disable-next-line no-unused-vars
      const flickrFeedApi = nock('http://api.flickr.com')
        .get(
          '/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json'
        )
        .reply(500);

      return photoModel.getFlickrPhotos('california', 'all').catch(error => {
        expect(error.toString()).toMatch(/Response code 500/);
      });
    });

    test('should error with invalid jsonp data', () => {
      // mock the flickr public feed api endpoint with invalid jsonp data that's missing parentheses
      const jsonpData = `jsonFlickrFeed{
        "items": [
          {
            "title": "Boating",
            "media": {
              "m": "http://farm4.staticflickr.com/3727/12608622365_9e9b8b377d_m.jpg"
            }
          }
        ]
      }`;

      // eslint-disable-next-line no-unused-vars
      const flickrFeedApi = nock('http://api.flickr.com')
        .get(
          '/services/feeds/photos_public.gne?tags=california&tagmode=all&format=json'
        )
        .reply(200, jsonpData);

      return photoModel.getFlickrPhotos('california', 'all').catch(error => {
        expect(error.toString()).toMatch(/Failed to convert jsonp to json/);
      });
    });
  });
});
