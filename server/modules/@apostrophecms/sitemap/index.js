module.exports = {
  options: {
    // Exclude certain types from the sitemap
    excludeTypes: [
      '@apostrophecms/image',
      '@apostrophecms/file',
      '@apostrophecms/user'
    ],
    // How frequently the content is likely to change
    changefreq: 'weekly',
    // Priority from 0.0 to 1.0
    priority: 0.5
  }
}; 