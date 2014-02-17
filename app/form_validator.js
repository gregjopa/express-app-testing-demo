var isValidCommaDelimitedList = function (value) {
  // allow letters, commas, and spaces
  var commaDelimitedListRegEx = /^[A-Za-z,\s]+$/;
  return commaDelimitedListRegEx.test(value);
};


var isValidTagmode = function (value) {
  return value === 'all' || value === 'any';
};


var hasValidFlickrAPIParams = function (tags, tagmode) {
  return isValidCommaDelimitedList(tags) && isValidTagmode(tagmode);
};


module.exports = {
  isValidCommaDelimitedList: isValidCommaDelimitedList,
  isValidTagmode: isValidTagmode,
  hasValidFlickrAPIParams: hasValidFlickrAPIParams
};
