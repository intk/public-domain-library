module.exports = {
  extend: '@apostrophecms/page-type',
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
