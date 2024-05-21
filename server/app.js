require('apostrophe')({
  shortName: 'library',
  baseUrl: process.env.APOS_BASE_URL || 'http://localhost:3000',
  modules: {
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'pdl-rich-text',
      },
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'pdl-image-widget',
      },
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'pdl-video-widget',
      },
    },
    asset: {},
    'default-page': {},
    'icon-widget': {},
    'locale-switcher': {},
    author: {},
    'author-page': {},
    book: {},
    'book-page': {},
  },
})
