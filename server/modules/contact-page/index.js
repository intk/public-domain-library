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
            sendLabel: {
              type: 'string',
            },
            successLabel: {
              type: 'string',
            },
            errorLabel: {
              type: 'string',
            },
          },
        },
      },
      area: {
        type: 'area',
        options: {
          max: 2,
          widgets: {
            donate: {},
            newsletter: {},
          },
        },
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'heading', 'paragraph', 'form'],
      },
      area: {
        label: 'Area',
        fields: [
          'area',
        ],
      },
    },
  },
  methods (self) {
    return {
      indexPage (req) {
        self.setTemplate(req, 'page')
      },
      showPage (req) {
        if (req.query.error) {
          req.data.page.error = req.query.error
        }
        self.setTemplate(req, 'submit')
      },
      dispatchAll () {
        self.dispatch('/', self.indexPage)
        self.dispatch('/:slug', self.showPage)
      },
    }
  },
}
