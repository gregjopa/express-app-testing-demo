var express = require('express');
var app = module.exports = express();

var formValidator = require('./form_validator');
var photoModel = require('./photo_model');




// public assets
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use('/coverage', express.static(__dirname + '/../test/coverage/reports'));




// ejs for view templates
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');




// route
app.get('/', function (req, res) {

  var tags = req.param('tags');
  var tagmode = req.param('tagmode');

  var ejsLocalVariables = {
    tagsParameter: tags || '',
    tagmodeParameter: tagmode || '',
    photos: [],
    searchResults: false,
    invalidParamters: false
  };


  // if no input params are passed in then render the view with out querying the api
  if (!tags && !tagmode) {
    return res.render('index', ejsLocalVariables);
  }


  // validate query parameters
  if (!formValidator.hasValidFlickrAPIParams(tags, tagmode)) {
    ejsLocalVariables.invalidParamters = true;
    return res.render('index', ejsLocalVariables);
  }


  // get photos from flickr public feed api
  photoModel.getFlickrPhotos(tags, tagmode, function (error, photos) {

    if (error) {
      console.error(error);
      return res.send(500, 'Internal Server Error');
    }

    ejsLocalVariables.photos = photos;
    ejsLocalVariables.searchResults = true;
    res.render('index', ejsLocalVariables);

  });


});




// server
app.listen(3000);
console.log('listening on port 3000');
