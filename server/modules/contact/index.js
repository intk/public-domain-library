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
          console.log('req.body', req.body)
          console.log('req.data.global.recaptchaSecretKey', req.data.global.recaptchaSecretKey)
          console.log('req.data.global.recaptchaSiteKey', req.data.global.recaptchaSiteKey)
          const locale = req.body.locale || 'en'
          let contactUrl = 'contact'
          const options = {
            from: config.get('nodemailer.auth.user'),
            to: config.get('nodemailer.auth.user'),
            subject: 'Public Domain Library - New contact submission',
          }

          try {
            const challenge = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                secret: req.data.global.recaptchaSecretKey,
                response: req.body['cf-turnstile-response'],
              }),
            })
            const response = await challenge.json()
            if (!response.success) {
              throw new Error('reCAPTCHA failed')
            }

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
