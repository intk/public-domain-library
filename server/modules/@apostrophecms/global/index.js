module.exports = {
  fields: {
    add: {
      headerNav: {
        label: 'Header navigation links',
        type: 'array',
        titleField: '_page[0].title',
        help: 'Add, remove, and reorder navigation items.',
        fields: {
          add: {
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1,
                },
              },
            },
          },
        },
      },
      footerNav: {
        label: 'Footer navigation links',
        type: 'array',
        titleField: '_page[0].title',
        help: 'Add, remove, and reorder navigation items.',
        fields: {
          add: {
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1,
                },
              },
            },
          },
        },
      },
      footerLegal: {
        label: 'Footer legal links',
        type: 'array',
        titleField: '_page[0].title',
        help: 'Add, remove, and reorder legal items such as Privacy Policy and Terms & Conditions.',
        fields: {
          add: {
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1,
                },
              },
            },
          },
        },
      },
      social: {
        label: 'Social links',
        type: 'array',
        titleField: 'url',
        help: 'Displayed in the footer',
        fields: {
          add: {
            url: {
              label: 'URL',
              type: 'url',
              required: true,
            },
            'social-link-icon': {
              label: 'Icon',
              type: 'area',
              options: {
                widgets: {
                  icon: {
                    background: 'black',
                  },
                },
                max: 1,
              },
              required: true,
            },
          },
        },
      },
      bookLegalNotice: {
        type: 'string',
        textarea: true,
      },
    },
    group: {
      legal: {
        label: 'Legal',
        fields: [
          'bookLegalNotice',
        ],
      },
      links: {
        label: 'Links',
        fields: [
          'headerNav', 'footerNav', 'footerLegal', 'social',
        ],
      },
    },
  },
}
