module.exports = {
  fields: {
    add: {
      primaryNav: {
        label: 'Primary site navigation',
        type: 'array',
        titleField: 'label',
        help: 'Add, remove, and reorder navigation items.',
        inline: true,
        draggable: true,
        fields: {
          add: {
            label: {
              label: 'Nav item label',
              type: 'string'
            },
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1
                }
              },
            },
          }
        }
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'primaryNav',
        ],
      },
    }
  }
}
