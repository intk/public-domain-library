module.exports = {
  extend: '@apostrophecms/piece-page-type',

  options: {
    label: 'pdl:Book Page',
    perPage: 12,
  },

  methods (self) {
    return {
      async ensureLocalizedPages () {
        const locales = self.apos.i18n?.options?.locales || {}
        const bookPages = await self.apos.doc.db.find({ type: self.name }).toArray()

        if (!bookPages?.length) {
          const req = self.apos.task.getReq()
          const newPage = {
            title: 'Books',
            slug: '/books',
            type: 'book-page',
          }
          const bookPage = await self.apos.page.insert(req, '_home', 'after', newPage)
          bookPages.push(bookPage)
        }

        let draftLocalizedPage
        const missingPages = []

        for (const locale of Object.keys(locales)) {
          const bookPagesWithCurrentLocale = bookPages.filter(bookPage => bookPage.aposLocale.split(':')[0] === locale)

          if (!bookPagesWithCurrentLocale.length) {
            missingPages.push(locale)
          } else {
            draftLocalizedPage = bookPagesWithCurrentLocale[0]
          }
        }

        if (missingPages.length) {
          if (!draftLocalizedPage) {
            const id = self.apos.util.generateId()
            draftLocalizedPage = await self.newInstance({
              aposDocId: id,
            })
          }
          for (const missingPage of missingPages) {
            const req = self.apos.task.getReq({ locale: missingPage })
            const localizedString = req.t('pdl:books')
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

      async beforeShow (req) {
        const latestBooks = await self.apos.book.find(req, {}).limit(8).toArray() || []

        let currentPieceAlreadyPresent = false
        for (const book of latestBooks) {
          if (book.slug === req.data?.piece?.slug) {
            latestBooks.splice(latestBooks.indexOf(book), 1)
            currentPieceAlreadyPresent = true
          }
        }

        if (!currentPieceAlreadyPresent) {
          latestBooks.pop()
        }

        req.data.latestBooks = latestBooks
      },
    }
  },

  // init (self) {
  //   self.apos.migration.add('localize-book-pages-slugs', async () => {
  //     await self.ensureLocalizedPages()
  //   })
  // },
}
