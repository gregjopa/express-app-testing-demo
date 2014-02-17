var request = require('request');


var getFlickrPhotos = function (tags, tagmode, callback) {

  var flickrPublicFeedAPI = {
    uri: 'http://api.flickr.com/services/feeds/photos_public.gne?',
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

        var json = parseJSONP(body);
        var photos = json.items;

        photos.forEach(function (photo) {
          photo.media.t = photo.media.m.split('m.jpg')[0] + 't.jpg';
          photo.media.b = photo.media.m.split('m.jpg')[0] + 'b.jpg';
        });

        callback('', photos);

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


var parseJSONP = function (jsonpData) {

  try {
    var startPos = jsonpData.indexOf('({');
    var endPos = jsonpData.lastIndexOf('})');
    var jsonString = jsonpData.substring(startPos + 1, endPos + 1);

    // remove escaped single quotes since they are not valid json
    jsonString = jsonString.replace(/\\'/g, "'");

    return JSON.parse(jsonString);
  }
  catch (e) {
    var error = new Error('Error coverting jsonp to json: ' + e.message);
    throw error;
  }

};


module.exports = {
  getFlickrPhotos: getFlickrPhotos,
  parseJSONP: parseJSONP
};
