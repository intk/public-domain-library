export default () => {
  apos.util.widgetPlayers['book-preview-widget'] = {
    selector: '[data-book-preview-widget]',
    player: function (el) {
      addPreviewSpacing()

      window.addEventListener('resize', addPreviewSpacing)

      function addPreviewSpacing () {
        if (screen.width < 1025) {
          const formatsLists = el.querySelectorAll('.pdl-book-preview__formats')
          if (formatsLists?.length) {
            for (const formatsList of formatsLists) {
              const displayList = formatsList.querySelector('[data-book-formats-list]')
              if (displayList) {
                displayList.addEventListener('click', (evt) => {
                  evt.stopPropagation()

                  const previewContainer = formatsList.parentElement
                  if (previewContainer.classList.contains('pdl-book-preview--big-space')) {
                    previewContainer.classList.remove('pdl-book-preview--big-space')
                  } else {
                    previewContainer.classList.add('pdl-book-preview--big-space')
                  }
                })
              }
            }
          }
        }
      }

      const body = document.querySelector('body')
      body.addEventListener('click', removePreviewSpacing)

      function removePreviewSpacing () {
        const previewContainers = document.querySelectorAll('.pdl-book-preview')
        if (previewContainers?.length) {
          for (const previewContainer of previewContainers) {
            previewContainer.classList.remove('pdl-book-preview--big-space')

            const displayList = previewContainer.querySelector('[data-book-formats-list]')
            if (displayList) {
              const secondFormat = previewContainer.querySelector('.pdl-book-preview__format--second')
              const thirdFormat = previewContainer.querySelector('.pdl-book-preview__format--third')
              secondFormat.classList.remove('pdl-book-preview__format--visible')
              thirdFormat.classList.remove('pdl-book-preview__format--visible')
            }
          }
        }
      }
    },
  }
}
