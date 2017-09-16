const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = module.exports = express();
const formValidator = require('./form_validator');
const photoModel = require('./photo_model');




// public assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use('/coverage', express.static(path.join(__dirname, '..', 'coverage')));




// ejs for view templates
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');




// route
app.get('/', (req, res) => {

  const tags = req.query.tags;
  const tagmode = req.query.tagmode;

  const ejsLocalVariables = {
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
  photoModel.getFlickrPhotos(tags, tagmode, (error, photos) => {

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
const port = process.env.PORT || 3000;
app.server = app.listen(port);
console.log(`listening on port ${port}`);
