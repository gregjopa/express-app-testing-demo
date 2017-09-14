var requireHelper = require('../require_helper');
var formValidator = requireHelper('form_validator');


describe('form_validator.js', () => {


  describe('isValidCommaDelimitedList(value)', () => {


    test('should return true for valid list of search terms', () => {

      var tags = 'california, sunset, red';
      expect(formValidator.isValidCommaDelimitedList(tags)).toBe(true);

    });


    test('should return true for valid single search term', () => {

      var tags = 'dogs';
      expect(formValidator.isValidCommaDelimitedList(tags)).toBe(true);

    });


    test('should return false for search term containing numbers', () => {

      var tags = 'dogs123';
      expect(formValidator.isValidCommaDelimitedList(tags)).toBe(false);

    });


    test(
      'should return false for search term containing special characters',
      () => {

        var tags = 'dogs%$';
        expect(formValidator.isValidCommaDelimitedList(tags)).toBe(false);

      }
    );


  });


  describe('isValidTagmode(value)', () => {


    test('should return true for valid tagmode "any"', () => {

      var tagmode = 'any';
      expect(formValidator.isValidTagmode(tagmode)).toBe(true);

    });


    test('should return true for valid tagmode "all"', () => {

      var tagmode = 'all';
      expect(formValidator.isValidTagmode(tagmode)).toBe(true);

    });


    test('should return false for invalid tagmode', () => {

      var tagmode = 'many';
      expect(formValidator.isValidTagmode(tagmode)).toBe(false);

    });


  });


  describe('hasValidFlickrAPIParams(tags, tagmode)', () => {


    test('should return true for valid params', () => {

      var tags = 'dogs, poodles';
      var tagmode = 'all';
      expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(true);

    });


    test('should return false for invalid tags', () => {

      var tags = 'dogs, poodles123';
      var tagmode = 'all';
      expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(false);

    });


    test('should return false for invalid tagmode', () => {

      var tags = 'dogs, poodles';
      var tagmode = 'all123';
      expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(false);

    });


  });


});
