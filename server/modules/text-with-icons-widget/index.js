module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Text with icons',
    icon: 'text-box-icon',
  },
  fields: {
    add: {
      backgroundColor: {
        type: 'select',
        choices: [
          {
            label: 'Black',
            value: 'black',
          },
          {
            label: 'White',
            value: 'white',
          },
        ],
        def: 'black',
      },
      textPart1: {
        type: 'string',
      },
      showIconTextPart1: {
        type: 'boolean',
        def: true,
      },
      textPart2: {
        type: 'string',
      },
      showIconTextPart2: {
        type: 'boolean',
        def: true,
      },
      link: {
        type: 'object',
        fields: {
          add: {
            linkText: {
              label: 'pdl:Text',
              type: 'string',
            },
            linkType: {
              label: 'pdl:Link Type',
              type: 'select',
              choices: [
                {
                  label: 'pdl:Page',
                  value: 'page',
                },
                {
                  label: 'pdl:Custom URL',
                  value: 'custom',
                },
              ],
            },
            _linkPage: {
              label: 'pdl:Page',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              builders: {
                project: {
                  title: 1,
                  _url: 1,
                },
              },
              if: {
                linkType: 'page',
              },
              required: true,
            },
            linkUrl: {
              label: 'pdl:Custom URL',
              type: 'url',
              if: {
                linkType: 'custom',
              },
              required: true,
            },
            linkTarget: {
              label: 'pdl:Will the link open a new browser tab?',
              type: 'checkboxes',
              choices: [
                {
                  label: 'pdl:Open in new tab',
                  value: '_blank',
                },
              ],
            },
          },
        },
      },
    },
  },
}
