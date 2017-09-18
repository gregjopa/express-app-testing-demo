function getFlickrPhotos(tags) {
  if (tags === 'error') {
    return Promise.reject('Internal server error');
  }

  return Promise.resolve([
    {
      title: 'Point Lobos sunset',
      link: 'http://www.flickr.com/photos/nathanleefer/24437997081/',
      media: {
        m: 'http://farm2.staticflickr.com/1566/24437997081_a18e803502_m.jpg',
        t: 'http://farm2.staticflickr.com/1566/24437997081_a18e803502_t.jpg',
        b: 'http://farm2.staticflickr.com/1566/24437997081_a18e803502_b.jpg'
      },
      date_taken: '2013-09-21T19:02:39-08:00',
      description:
        '<p><a href="http://www.flickr.com/people/nathanleefer/">' +
        'nathan.leefer</a> posted a photo</p>',
      published: '2016-01-21T14:45:43Z',
      author: 'nobody@flickr.com ("nathan.leefer")',
      author_id: '127138564@N02',
      tags: 'sunsetcalifornia pointlobospacificoceanmontereycarmelbigsur'
    }
  ]);
}

module.exports = {
  getFlickrPhotos
};
