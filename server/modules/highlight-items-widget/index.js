module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Highlight Items',
    icon: 'view-carousel-icon',
  },
  icons: {
    'view-carousel-icon': 'ViewCarousel',
  },
  fields: {
    add: {
      items: {
        type: 'array',
        fields: {
          add: {
            title: {
              type: 'string',
            },
            description: {
              label: 'pdl:Description',
              type: 'string',
              textarea: true,
            },
            year: {
              label: 'pdl:Year',
              help: 'pdl:Year when work entered public domain',
              type: 'integer',
            },
            color: {
              label: 'pdl:Color',
              type: 'color',
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
                        value: 'page'
                      },
                      {
                        label: 'pdl:Custom URL',
                        value: 'custom'
                      }
                    ]
                  },
                  _linkPage: {
                    label: 'pdl:Page',
                    type: 'relationship',
                    withType: '@apostrophecms/page',
                    max: 1,
                    builders: {
                      project: {
                        title: 1,
                        _url: 1
                      }
                    },
                    if: {
                      linkType: 'page'
                    },
                    required: true
                  },
                  linkUrl: {
                    label: 'pdl:Custom URL',
                    type: 'url',
                    if: {
                      linkType: 'custom'
                    },
                    required: true
                  },
                  linkTarget: {
                    label: 'pdl:Will the link open a new browser tab?',
                    type: 'checkboxes',
                    choices: [
                      {
                        label: 'pdl:Open in new tab',
                        value: '_blank'
                      }
                    ]
                  },
                }
              }
            },
            imageArea: {
              label: 'pdl:Image',
              type: 'area',
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/image': {
                    className: 'pdl-highlight-widget__image pdl-image-widget',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
