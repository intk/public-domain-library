module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Separator',
  },
  fields: {
    add: {
      color: {
        type: 'select',
        label: 'Color',
        def: 'white',
        choices: [
          {
            label: 'White',
            value: 'white',
          },
          {
            label: 'Black',
            value: 'black',
          },
        ],
      },
    },
  },
}
