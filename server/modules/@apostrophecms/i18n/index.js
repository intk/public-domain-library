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
}
