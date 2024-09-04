export default () => {
  // display book formats when clicking on 3 dots (next to "Start reading" button)
  const formatsLists = document.querySelectorAll('.pdl-book-preview__formats')
  if (formatsLists?.length) {
    for (const formatsList of formatsLists) {
      const displayList = formatsList.querySelector('[data-book-formats-list]')
      if (displayList) {
        displayList.addEventListener('click', () => {
          const secondFormat = formatsList.querySelector('.pdl-book-preview__format--second')
          const thirdFormat = formatsList.querySelector('.pdl-book-preview__format--third')

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
      preview.addEventListener('click', () => {
        const previewViewButton = preview.querySelector('[data-book-preview-view]')
        if (previewViewButton) {
          previewViewButton.classList.add('pdl-book-preview__view--visible')
        }
      })
    }
  }

  // display shadows over book image
  const imageWrappers = document.querySelectorAll('.pdl-book__image-wrapper .apos-area')
  for (const imageWrapper of imageWrappers) {
    const shadow0 = document.createElement('img')
    shadow0.src = apos.util.assetUrl('/modules/book-page/shadow0.svg')
    shadow0.alt = 'shadow'
    shadow0.classList.add('pdl-book__shadow')
    imageWrapper.appendChild(shadow0)

    const shadow1 = document.createElement('img')
    shadow1.src = apos.util.assetUrl('/modules/book-page/shadow1.svg')
    shadow1.alt = 'shadow'
    shadow1.classList.add('pdl-book__shadow')
    imageWrapper.appendChild(shadow1)
  }
}
