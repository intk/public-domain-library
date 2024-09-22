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
              type: 'area',
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/rich-text': {
                    styles: [
                      {
                        tag: 'span',
                        label: 'Description',
                        class: 'pdl-highlight-widget__description',
                      },
                    ],
                  },
                },
              },
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
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              builders: {
                project: {
                  title: 1,
                  _url: 1,
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
