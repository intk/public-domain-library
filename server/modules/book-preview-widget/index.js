module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Book Preview',
    icon: 'view-column-icon',
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
