module.exports = {
  async localizeNewDocuments (self, req, doc) {
    if (!req.pendingLocalization) {
      const locales = self.apos.i18n?.options?.locales || {}
      for (const locale of Object.keys(locales)) {
        if (locale !== doc.aposLocale.split(':')[0]) {
          const manager = self.apos.doc.getManager(doc.type)
          try {
            req.pendingLocalization = true
            const newLocalizedDoc = await manager.localize(req, doc, locale, { })
            await manager.publish(req, newLocalizedDoc, {})
          } catch (error) {
          }

          self.apos.util.info(`Created localized ${doc.type} "${doc.title}" for locale "${locale}"`)
        }
      }
    }
  },
}
