const formValidator = require('../../app/form_validator');

describe('isValidCommaDelimitedList(value)', () => {
  test('should return true for valid list of search terms', () => {
    const tags = 'california, sunset, red';
    expect(formValidator.isValidCommaDelimitedList(tags)).toBe(true);
  });

  test('should return true for valid single search term', () => {
    const tags = 'dogs';
    expect(formValidator.isValidCommaDelimitedList(tags)).toBe(true);
  });

  test('should return false for search term containing numbers', () => {
    const tags = 'dogs123';
    expect(formValidator.isValidCommaDelimitedList(tags)).toBe(false);
  });

  test('should return false for search term containing special characters', () => {
    const tags = 'dogs%$';
    expect(formValidator.isValidCommaDelimitedList(tags)).toBe(false);
  });
});

describe('isValidTagmode(value)', () => {
  test('should return true for valid tagmode "any"', () => {
    const tagmode = 'any';
    expect(formValidator.isValidTagmode(tagmode)).toBe(true);
  });

  test('should return true for valid tagmode "all"', () => {
    const tagmode = 'all';
    expect(formValidator.isValidTagmode(tagmode)).toBe(true);
  });

  test('should return false for invalid tagmode', () => {
    const tagmode = 'many';
    expect(formValidator.isValidTagmode(tagmode)).toBe(false);
  });
});

describe('hasValidFlickrAPIParams(tags, tagmode)', () => {
  test('should return true for valid params', () => {
    const tags = 'dogs, poodles';
    const tagmode = 'all';
    expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(true);
  });

  test('should return false for invalid tags', () => {
    const tags = 'dogs, poodles123';
    const tagmode = 'all';
    expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(false);
  });

  test('should return false for invalid tagmode', () => {
    const tags = 'dogs, poodles';
    const tagmode = 'all123';
    expect(formValidator.hasValidFlickrAPIParams(tags, tagmode)).toBe(false);
  });
});
