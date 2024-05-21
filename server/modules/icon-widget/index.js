module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Icon',
    icon: 'image-icon',
    dimensionAttrs: true,
    placeholder: false,
  },
  fields: {
    add: {
      _image: {
        type: 'relationship',
        label: 'apostrophe:image',
        max: 1,
        required: true,
        withType: '@apostrophecms/image',
      },
    },
  },
}
