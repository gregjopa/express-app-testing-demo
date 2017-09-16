var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = module.exports = express();
var formValidator = require('./form_validator');
var photoModel = require('./photo_model');




// public assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use('/coverage', express.static(path.join(__dirname, '..', 'coverage')));




// ejs for view templates
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');




// route
app.get('/', function (req, res) {

  var tags = req.query.tags;
  var tagmode = req.query.tagmode;

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
      // console.error(error);
      return res.send(500, 'Internal Server Error');
    }

    ejsLocalVariables.photos = photos;
    ejsLocalVariables.searchResults = true;
    res.render('index', ejsLocalVariables);

  });


});




// server
var port = process.env.PORT || 3000;
app.server = app.listen(port);
console.log('listening on port ' + port);
