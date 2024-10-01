module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default',
      },
      {
        name: 'book-page',
        label: 'Book',
      },
      {
        name: 'author-page',
        label: 'Author',
      },
    ],
    park: [
      {
        slug: '/',
        parkedId: 'home',
        type: '@apostrophecms/home-page',
      },
      {
        slug: '/search',
        parkedId: 'search',
        title: 'Search',
        type: '@apostrophecms/search',
      },
      {
        slug: '/donate',
        parkedId: 'donate',
        title: 'Donate',
        type: 'donate-page',
      },
    ],
  },
}
