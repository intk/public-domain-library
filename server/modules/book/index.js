module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'pdl:Book',
    alias: 'book',
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
            imageArea: 1,
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
      fontColor: {
        label: 'pdl:Font Color',
        type: 'boolean',
        toggle: {
          true: 'White',
          false: 'Black',
        },
        def: true,
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
            fileFormat: {
              label: 'pdl:File Format',
              type: 'string',
              help: 'If empty, the extension will be used',
            },
          },
        },
      },
      creditsRTE: {
        label: 'pdl:Credits',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [],
              styles: [],
            },
          },
        },
      },
      legalNoticeRTE: {
        label: 'pdl:Legal Notice',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [],
              styles: [],
            },
          },
        },
      },
    },
    group: {
      basics: {
        fields: ['_author', 'excerptRTE', 'imageArea', 'color', 'fontColor', 'files', 'creditsRTE', 'legalNoticeRTE'],
      },
    },
  },

  handlers (self) {
    return {
      beforeSave: {
        async updateHighSearchText (req, doc) {
          if (doc._author[0]?.title && !doc.highSearchText.includes(doc._author[0].title)) {
            doc.highSearchText = doc.highSearchText + ' ' + doc._author[0].title
          }
        },
      },
    }
  },
}
