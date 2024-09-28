const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
  // extend: '@apostrophecms/page-type',
  methods (self) {
    return {
      indexPage (req) {
        req.notFound = true
      },
      showPage (req) {
        self.setTemplate(req, req.params.slug)
      },

      dispatchAll () {
        self.dispatch('/', self.indexPage)
        self.dispatch('/:slug', self.showPage)
      },
    }
  },
  routes (self) {
    return {
      get: {
        async checkout(req, res) {
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: 'price_1Q3iQrKltrjEwtH42kErhdkJ',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${process.env.APOS_BASE_URL}/donate/success`,
            cancel_url: `${process.env.APOS_BASE_URL}/donate/cancel`,
            automatic_tax: { enabled: true },
          })
          console.log('session', require('util').inspect(session, { colors: true, depth: 1 }))

          res.redirect(303, session.url)
        },
      },
    }
  },
}
