let photoModel;

describe('getFlickrPhotos(tags, tagmode, callback)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should return photos', () => {
    // mock the flickr public feed api endpoint
    jest.doMock('got', () => {
      return jest.fn(() => {
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
        return Promise.resolve({
          body: jsonpData
        });
      });
    });

    photoModel = require('../../app/photo_model');

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
    jest.doMock('got', () => {
      return jest.fn(() => {
        return Promise.reject('Response code 500 (Internal Server Error)');
      });
    });

    photoModel = require('../../app/photo_model');

    return photoModel.getFlickrPhotos('california', 'all').catch(error => {
      expect(error.toString()).toMatch(/Response code 500/);
    });
  });

  test('should error with invalid jsonp data', () => {
    // mock the flickr public feed api endpoint with invalid jsonp data that's missing parentheses
    jest.doMock('got', () => {
      return jest.fn(() => {
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
        return Promise.resolve({
          body: jsonpData
        });
      });
    });

    photoModel = require('../../app/photo_model');

    return photoModel.getFlickrPhotos('california', 'all').catch(error => {
      expect(error.toString()).toMatch(/Failed to convert jsonp to json/);
    });
  });
});
