module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page',
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              styles: [
                {
                  tag: 'span',
                  label: 'Bigger Text',
                  class: 'pdl-content__bigger-text',
                },
              ],
            },
          },
        },
      },
      layout: {
        type: 'select',
        label: 'Column Layout',
        required: true,
        choices: [
          {
            label: '1 column, 100%',
            value: '1',
          },
          {
            label: '2 columns, 50%',
            value: '2',
          },
        ],
        def: '1',
      },
      column1: {
        label: 'Column One',
        type: 'area',
        contextual: true,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              styles: [
                {
                  tag: 'h1',
                  label: 'Big Text',
                  class: 'pdl-content__big-text',
                },
              ],
            },
          },
        },
        if: {
          $or: [
            { layout: '1' },
            { layout: '2' },
          ],
        },
      },
      column2: {
        label: 'Column Two',
        type: 'area',
        contextual: true,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {},
          },
        },
        if: {
          layout: '2',
        },
      },
      area: {
        type: 'area',
        options: {
          max: 2,
          widgets: {
            donate: {},
            newsletter: {},
          },
        },
      },
      hideTitle: {
        type: 'boolean',
        label: 'Hide Title',
        def: false,
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main',
          'layout',
          'column1',
          'column2',
        ],
      },
      area: {
        label: 'Area',
        fields: [
          'area',
        ],
      },
    },
  },
}
