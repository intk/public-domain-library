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
      aboutSentence: {
        type: 'object',
        fields: {
          add: {
            aboutTextPart1: {
              type: 'string',
            },
            aboutTextPart2: {
              type: 'string',
            },
          },
        },
      },
      areas: {
        type: 'area',
        options: {
          widgets: {
            'book-preview': {},
            'highlight-items': {},
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
          'aboutSentence',
          'areas',
        ],
      },
    },
  },
}
