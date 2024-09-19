export default () => {
  // display book formats when clicking on 3 dots (next to "Start reading" button)
  const formatsLists = document.querySelectorAll('.pdl-book-preview__formats')
  if (formatsLists?.length) {
    for (const formatsList of formatsLists) {
      const displayList = formatsList.querySelector('[data-book-formats-list]')
      if (displayList) {
        displayList.addEventListener('click', (evt) => {
          evt.stopPropagation()
          const secondFormat = formatsList.querySelector('.pdl-book-preview__format--second')
          const thirdFormat = formatsList.querySelector('.pdl-book-preview__format--third')

          const previewContainer = formatsList.parentElement
          if (previewContainer.classList.contains('pdl-book-preview--big-space')) {
            previewContainer.classList.remove('pdl-book-preview--big-space')
          } else {
            previewContainer.classList.add('pdl-book-preview--big-space')
          }
          secondFormat.classList.toggle('pdl-book-preview__format--visible')
          thirdFormat.classList.toggle('pdl-book-preview__format--visible')
        })
      }
    }
  }

  // display "View" button on mobile and tablet devices
  const previews = document.querySelectorAll('[data-book-preview]')
  if (previews?.length) {
    for (const preview of previews) {
      preview.addEventListener('click', (evt) => {
        evt.stopPropagation()

        const previewViewButton = preview.querySelector('[data-book-preview-view]')
        if (previewViewButton) {
          previewViewButton.classList.add('pdl-book-preview__view--visible')
        }
      })
    }
  }

  const body = document.querySelector('body')
  body.addEventListener('click', cancelPreviewSpacing)

  function cancelPreviewSpacing () {
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
}
