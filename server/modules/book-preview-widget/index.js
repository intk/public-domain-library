module.exports = {
  extend: '@apostrophecms/widget-type',

  options: {
    label: 'Book Preview',
    icon: 'view-column-outline-icon',
  },

  icons: {
    'view-column-outline-icon': 'ViewColumnOutline',
  },

  fields: {
    add: {
      title: {
        type: 'string',
      },
      latestBooks: {
        type: 'boolean',
        label: 'Show latest books',
        def: false,
      },
      _books: {
        type: 'relationship',
        required: true,
        withType: 'book',
        withRelationships: ['_author'],
        if: {
          latestBooks: false,
        },
      },
    },
  },

  extendMethods (self) {
    return {
      async load (_super, req, widgets) {
        await _super(req, widgets)
        for (const widget of widgets) {
          if (widget.latestBooks) {
            const latestBooks = await self.apos.book.find(req, {}).limit(8).toArray() || []
            widget._books = latestBooks
          }
        }
      },
    }
  },
}
