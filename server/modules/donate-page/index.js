module.exports = {
  extend: '@apostrophecms/page-type',
  fields: {
    add: {
      successSentence: {
        type: 'string',
        textarea: true,
      },
      cancelSentence: {
        type: 'string',
        textarea: true,
      },
      widget: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            donate: {},
          },
        },
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['successSentence', 'cancelSentence', 'widget'],
      },
    },
  },
  methods (self) {
    return {
      indexPage (req) {
        self.setTemplate(req, 'index')
      },

      showPage (req) {
        if (req.query.error) {
          req.data.page.error = req.query.error
        }
        self.setTemplate(req, req.params.slug)
      },

      dispatchAll () {
        self.dispatch('/', self.indexPage)
        self.dispatch('/:slug', self.showPage)
      },
    }
  },
}
