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
              required: true,
            },
            emailLabel: {
              type: 'string',
              required: true,
            },
            messageLabel: {
              type: 'string',
              required: true,
            },
            sendLabel: {
              type: 'string',
              required: true,
            },
            successLabel: {
              type: 'string',
              required: true,
            },
            errorLabel: {
              type: 'string',
              required: true,
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
            'text-with-icons': {},
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
