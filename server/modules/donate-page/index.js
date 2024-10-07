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
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['successSentence', 'cancelSentence'],
      },
    },
  },
  methods (self) {
    return {
      indexPage (req) {
        req.notFound = true
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
