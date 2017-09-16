const request = require('request');
const jsonpHelper = require('./jsonp_helper');


function getFlickrPhotos(tags, tagmode, callback) {

  const flickrPublicFeedAPI = {
    uri: 'http://api.flickr.com/services/feeds/photos_public.gne',
    timeout: 10000,
    qs: {
      tags: tags,
      tagmode: tagmode,
      format: 'json'
    }
  };

  request.get(flickrPublicFeedAPI, (error, response, body) => {

    if (!error && response.statusCode === 200) {

      try {

        const json = jsonpHelper.parseJSONP(body);
        const photos = json.items;

        photos.forEach(photo => {
          photo.media.t = photo.media.m.split('m.jpg')[0] + 't.jpg';
          photo.media.b = photo.media.m.split('m.jpg')[0] + 'b.jpg';
        });

        callback(null, photos);

      }
      catch (e) {
        callback(new Error(`Flickr public feed api error: ${e.message}`));
      }

    }
    else {
      callback(new Error('Flickr public feed api error'));
    }

  });

}


module.exports = {
  getFlickrPhotos
};
