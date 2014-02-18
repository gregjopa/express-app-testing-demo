/* jshint expr: true */

var should = require('should');
var requireHelper = require('../require_helper');
var formValidator = requireHelper('form_validator');


describe('form_validator.js', function () {


  describe('isValidCommaDelimitedList(value)', function () {


    it('should return true for valid list of search terms', function () {

      var tags = 'california, sunset, red';
      formValidator.isValidCommaDelimitedList(tags).should.be.true;

    });


    it('should return true for valid single search term', function () {

      var tags = 'dogs';
      formValidator.isValidCommaDelimitedList(tags).should.be.true;

    });


    it('should return false for search term containing numbers', function () {

      var tags = 'dogs123';
      formValidator.isValidCommaDelimitedList(tags).should.be.false;

    });


    it('should return false for search term containing special characters', function () {

      var tags = 'dogs%$';
      formValidator.isValidCommaDelimitedList(tags).should.be.false;

    });


  });


  describe('isValidTagmode(value)', function () {


    it('should return true for valid tagmode "any"', function () {

      var tagmode = 'any';
      formValidator.isValidTagmode(tagmode).should.be.true;

    });


    it('should return true for valid tagmode "all"', function () {

      var tagmode = 'all';
      formValidator.isValidTagmode(tagmode).should.be.true;

    });


    it('should return false for invalid tagmode', function () {

      var tagmode = 'many';
      formValidator.isValidTagmode(tagmode).should.be.false;

    });


  });


  describe('hasValidFlickrAPIParams(tags, tagmode)', function () {


    it('should return true for valid params', function () {

      var tags = 'dogs, poodles';
      var tagmode = 'all';
      formValidator.hasValidFlickrAPIParams(tags, tagmode).should.be.true;

    });


    it('should return false for invalid tags', function () {

      var tags = 'dogs, poodles123';
      var tagmode = 'all';
      formValidator.hasValidFlickrAPIParams(tags, tagmode).should.be.false;

    });


    it('should return false for invalid tagmode', function () {

      var tags = 'dogs, poodles';
      var tagmode = 'all123';
      formValidator.hasValidFlickrAPIParams(tags, tagmode).should.be.false;

    });


  });


});
