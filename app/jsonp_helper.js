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
  parseJSONP: parseJSONP
};
