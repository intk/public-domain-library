module.exports = {
  options: {
    label: 'Home Page',
  },
  fields: {
    add: {
      backgroundText: {
        type: 'string',
      },
      _coverBooks: {
        type: 'relationship',
        withType: 'book',
        max: 9,
        builders: {
          project: {
            title: 1,
            _url: 1,
            imageArea: 1,
          },
        },
      },
      areas: {
        type: 'area',
        options: {
          widgets: {
            'text-with-icons': {},
            'book-preview': {},
            'highlight-items': {},
            donate: {},
            newsletter: {},
            separator: {},
          },
        },
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'backgroundText',
          '_coverBooks',
          'areas',
        ],
      },
    },
  },
}
