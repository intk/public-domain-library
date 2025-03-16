module.exports = {
  options: {
    defaultLocale: 'en',
    redirectToFirstLocale: true,
    locales: {
      en: {
        label: 'English',
        prefix: '/en',
      },
      fr: {
        label: 'Français',
        prefix: '/fr',
      },
      es: {
        label: 'Español',
        prefix: '/es',
      },
      pt: {
        label: 'Português',
        prefix: '/pt',
      },
      nl: {
        label: 'Nederlands',
        prefix: '/nl',
      },
    },
  },
  helpers (self) {
    return {
      locales () {
        return Object.entries(self.locales).map(([key, locale]) => ({
          ...locale,
          name: key,
        }))
      },
    }
  },
  middleware (self) {
    return {
      redirectToCurrentLocale (req, res, next) {
        if (!self.options.redirectToFirstLocale) {
          return next()
        }

        if (req.originalUrl.includes(req.locale)) {
          return next()
        }

        const locales = Object.values(
          self.filterPrivateLocales(req, self.locales),
        )
        const localesWithoutHostname = locales.filter(
          locale => !locale.hostname,
        )
        const localesWithCurrentHostname = locales.filter(
          locale => locale.hostname && locale.hostname.split(':')[0] === req.hostname,
        )

        const localesToCheck = localesWithCurrentHostname.length
          ? localesWithCurrentHostname
          : localesWithoutHostname

        if (!localesToCheck.length || !localesToCheck.every(locale => locale.prefix)) {
          return next()
        }

        const redirectUrl = `${localesToCheck[0].prefix}${req.url}`
        return res.redirect(redirectUrl)
      },
    }
  },
}
