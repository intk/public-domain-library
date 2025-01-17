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

          console.log('req.body[g-recaptcha-response] ====> ', req.body['g-recaptcha-response'])
          console.log('req.data.global.recaptchaSecretKey ====> ', req.data.global.recaptchaSecretKey)

          try {
            const body = JSON.stringify({
              secret: req.data.global.recaptchaSecretKey,
              response: req.body['g-recaptcha-response'],
            })
            const challenge = await fetch('https://www.google.com/recaptcha/api/siteverify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body,
            })
            console.log('challenge ====> ', await challenge.json())
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
