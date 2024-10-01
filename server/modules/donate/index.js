const url = require('url')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
  extend: '@apostrophecms/module',
  options: {
    i18n: {
      ns: 'pdl',
    },
  },
  routes (self) {
    return {
      post: {
        async checkout (req, res) {
          try {
            // Test card numbers
            // Payment in succcess: 4242 4242 4242 4242
            // Authentication required: 4000 0025 0000 3155
            // Rejected payment: 4000 0000 0000 9995
            if (!req.body.amount || req.body.amount < 0.6) {
              return res.redirect(url.format({
                pathname: '/donate/error',
                query: {
                  error: 'Minimum amount is $0.60',
                },
              }))
            }

            const session = await stripe.checkout.sessions.create({
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'Public Domain Library Donation',
                    },
                    unit_amount: Math.round(parseFloat(req.body.amount) * 100),
                  },
                  // price: 'price_1Q3iQrKltrjEwtH42kErhdkJ',
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: `${process.env.APOS_BASE_URL}/donate/success`,
              cancel_url: `${process.env.APOS_BASE_URL}/donate/cancel`,
              automatic_tax: { enabled: true },
            })

            res.redirect(303, session.url)
          } catch (error) {
            console.error('error', error)
            res.redirect(url.format({
              pathname: '/donate/error',
              query: {
                error: 'Sorry, an error occurred.',
              },
            }))
          }
        },
      },
    }
  },
}
