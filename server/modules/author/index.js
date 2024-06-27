const { localizeNewDocuments } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'pdl:Author',
    perPage: 20,
    sort: {
      title: 1,
    },
  },
  fields: {
    add: {
      biographyRTE: {
        label: 'pdl:Biography',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              styles: [
                {
                  tag: 'span',
                  label: 'Author Bio',
                  class: 'pdl-author__biography',
                },
              ],
            },
          },
        },
      },
      imageArea: {
        label: 'pdl:Image',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {
              className: 'pdl-author__image pdl-image-widget',
            },
          },
        },
      },
      copyrightTerm: {
        label: 'pdl:Copyright Term',
        help: 'pdl:Year when work entered public domain',
        type: 'integer',
      },
      color: {
        label: 'pdl:Color',
        type: 'color',
      },
      _books: {
        type: 'relationshipReverse',
        withType: 'book',
        reverseOf: '_author',
        ifOnlyOne: true,
        withRelationships: ['_author'],
      },
    },
    group: {
      basics: {
        fields: ['biographyRTE', 'imageArea', 'copyrightTerm', 'color'],
      },
    },
  },

  handlers (self) {
    return {
      afterInsert: {
        async localizeNewAuthor (req, doc) {
          await localizeNewDocuments(self, req, doc)
        },
      },
    }
  },
}
