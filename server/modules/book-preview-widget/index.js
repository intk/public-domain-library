module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Book Preview',
    icon: 'view-column-outline-icon',
  },
  icons: {
    'view-column-outline-icon': 'ViewColumnOutline',
  },
  fields: {
    add: {
      title: {
        type: 'string',
      },
      _books: {
        type: 'relationship',
        required: true,
        withType: 'book',
        withRelationships: ['_author'],
      },
    },
  },
}
