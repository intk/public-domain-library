module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'pdl:Author',
    perPage: 17,
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
      copyrightNote: {
        label: 'pdl:Copyright Note',
        type: 'string',
        textarea: true,
        help: 'pdl:copyrightContent',
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
        fields: ['biographyRTE', 'copyrightTerm', 'copyrightNote', 'color', 'imageArea'],
      },
    },
  },
}
