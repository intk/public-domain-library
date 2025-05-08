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
    '@apostrophecms/favicon': {},
    '@apostrophecms/open-graph': {},
    '@apostrophecms/seo': {},
    '@apostrophecms/sitemap': {},
    '@apostrophecms/global': {
      options: {
        seoGoogleAnalytics: true,
        seoGoogleTagManager: true,
        seoGoogleVerification: true,
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
    'book-preview-widget': {},
    'highlight-items-widget': {},
    contact: {},
    'contact-page': {},
    'donate-page': {},
    'donate-widget': {},
    newsletter: {},
    'newsletter-widget': {},
    'separator-widget': {},
    'text-with-icons-widget': {},
  },
})
