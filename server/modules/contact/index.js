const config = require('config')

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
        async submit (req, res) {
          const locale = req.body.locale || 'en'
          let contactUrl = 'contact'
          const options = {
            from: config.get('nodemailer.auth.user'),
            to: config.get('nodemailer.auth.user'),
            subject: 'Public Domain Library - New contact submission',
          }

          try {
            await self.email(req, 'email.html', { body: req.body }, options)
            const referer = req.headers.referrer?.split('/') || []
            contactUrl = referer[referer.length - 1] || contactUrl
            res.redirect(`/${locale}/${contactUrl}/submit`)
          } catch (error) {
            console.error('error', error)
            res.redirect(`/${locale}/${contactUrl}/submit?error=true`)
          }
        },
      },
    }
  },
}
