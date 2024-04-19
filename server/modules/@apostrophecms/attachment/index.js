module.exports = {
  options: {
    fileGroups: [
      {
        name: 'images',
        label: 'apostrophe:images',
        extensions: [
          'gif',
          'jpg',
          'png',
          'svg',
          'webp',
        ],
        extensionMaps: { jpeg: 'jpg' },
      },
      {
        name: 'office',
        label: 'apostrophe:office',
        extensions: [
          'pdf',
          'epub',
        ],
        extensionMaps: {},
      },
    ],
  },
}
