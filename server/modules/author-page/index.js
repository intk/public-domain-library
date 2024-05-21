module.exports = {
  extend: '@apostrophecms/piece-page-type',

  options: {
    label: 'pdl:Author Page',
  },

  methods (self) {
    return {
      async ensureLocalizedPages () {
        const locales = self.apos.i18n?.options?.locales || {}
        const authorPages = await self.apos.doc.db.find({ type: self.name }).toArray()

        if (!authorPages?.length) {
          const req = self.apos.task.getReq()
          const newPage = {
            title: 'Authors',
            slug: '/authors',
            type: 'author-page',
          }
          const authorPage = await self.apos.page.insert(req, '_home', 'after', newPage)
          authorPages.push(authorPage)
        }

          let draftLocalizedPage
          const missingPages = []

          for (const locale of Object.keys(locales)) {
            const authorPagesWithCurrentLocale = authorPages.filter(authorPage => authorPage.aposLocale.split(':')[0] === locale)

            if (!authorPagesWithCurrentLocale.length) {
              missingPages.push(locale)
            } else {
              draftLocalizedPage = authorPagesWithCurrentLocale[0]
            }
          }

          if (missingPages.length) {
            if (!draftLocalizedPage) {
              const id = self.apos.util.generateId()
              draftLocalizedPage = await self.newInstance({
                aposDocId: id,
              })
            }

            console.log('draftLocalizedPage', require('util').inspect(draftLocalizedPage, { colors: true, depth: 1 }))
            for (const missingPage of missingPages) {
              const req = self.apos.task.getReq({ locale: missingPage })
              const localizedString = req.t('pdl:authors')
              const slug = '/' + self.apos.util.slugify(localizedString)
              const title = self.apos.util.capitalizeFirst(localizedString)
              draftLocalizedPage = {
                _id: `${draftLocalizedPage.aposDocId}:${missingPage}:draft`,
                ...draftLocalizedPage,
                title,
                slug,
              }
              const newLocalizedPage = await self.apos.page.localize(req, draftLocalizedPage, missingPage, {})
              await self.apos.page.publish(req, newLocalizedPage, {})

              self.apos.util.info(`Created localized ${self.name} page for ${missingPage}`)
            }
          }
      },
    }
  },

  async init(self) {
    self.apos.migration.add('localize-author-pages-slugs', async () => {
      await self.ensureLocalizedPages()
    })
  },
}
