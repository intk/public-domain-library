module.exports = {
  options: {
    i18n: {
      ns: 'pdl',
      browser: true,
    },
  },
  handlers (self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack (req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production')
        },
      },
    }
  },
}
