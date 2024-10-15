module.exports = {
  extend: '@apostrophecms/page-type',
  fields: {
    add: {
      heading: {
        type: 'string',
      },
      paragraph: {
        type: 'string',
        textarea: true,
      },
      form: {
        type: 'object',
        fields: {
          add: {
            nameLabel: {
              type: 'string',
            },
            emailLabel: {
              type: 'string',
            },
            messageLabel: {
              type: 'string',
            },
          },
        },
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'heading', 'paragraph', 'form'],
      },
    },
  },
  methods (self) {
    return {
      indexPage (req) {
        self.setTemplate(req, 'index')
      },
      showPage (req) {
        req.notFound = true
      },
      // dispatchAll () {
      //   self.dispatch('/', self.indexPage)
      //   self.dispatch('/:slug', self.showPage)
      // },
    }
  },
}
