module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default',
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
    ],
  },
}
