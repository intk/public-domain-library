module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'pdl:Copyright Term',
    icon: 'text-icon',
  },
  fields: {
    add: {
      copyrightTerm: {
        label: 'pdl:Copyright Term',
        type: 'string',
      },
    },
  },
  icons: {
    'text-icon': 'Text',
  },
}
