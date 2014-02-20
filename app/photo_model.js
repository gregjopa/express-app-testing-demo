var request = require('request');
var jsonpHelper = require('./jsonp_helper');


var getFlickrPhotos = function (tags, tagmode, callback) {

  var flickrPublicFeedAPI = {
    uri: 'http://api.flickr.com/services/feeds/photos_public.gne',
    timeout: 10000,
    qs: {
      tags: tags,
      tagmode: tagmode,
      format: 'json'
    }
  };

  request.get(flickrPublicFeedAPI, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      try {

        var json = jsonpHelper.parseJSONP(body);
        var photos = json.items;

        photos.forEach(function (photo) {
          photo.media.t = photo.media.m.split('m.jpg')[0] + 't.jpg';
          photo.media.b = photo.media.m.split('m.jpg')[0] + 'b.jpg';
        });

        callback(null, photos);

      }
      catch (e) {
        callback(new Error('Flickr public feed api error: ' + e.message));
      }

    }
    else {
      callback(new Error('Flickr public feed api error'));
    }

  });

};


module.exports = {
  getFlickrPhotos: getFlickrPhotos
};
