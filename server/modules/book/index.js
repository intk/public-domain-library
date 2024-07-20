const { localizeNewDocuments } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'pdl:Book',
  },
  fields: {
    add: {
      _author: {
        type: 'relationship',
        withType: 'author',
        label: 'pdl:Author',
        max: 1,
        builders: {
          project: {
            title: 1,
            _url: 1,
            image: 1,
          },
        },
      },
      excerptRTE: {
        label: 'pdl:Excerpt',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              styles: [
                {
                  tag: 'span',
                  label: 'Book Excerpt',
                  class: 'pdl-book__excerpt',
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
              className: 'pdl-book__image pdl-image-widget',
            },
          },
        },
      },
      color: {
        label: 'pdl:Color',
        type: 'color',
      },
      files: {
        type: 'array',
        label: 'pdl:Files',
        inline: { alwaysExpand: true },
        draggable: true,
        titleField: 'file.extension',
        max: 3,
        fields: {
          add: {
            file: {
              label: 'pdl:File',
              type: 'attachment',
              fileGroup: 'office',
            },
          },
        },
      },
    },
    group: {
      basics: {
        fields: ['_author', 'excerptRTE', 'imageArea', 'color', 'files'],
      },
    },
  },

  handlers (self) {
    return {
      afterInsert: {
        async localizeNewBook (req, doc) {
          await localizeNewDocuments(self, req, doc)
        },
      },
    }
  },
}
