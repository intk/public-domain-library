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

  // // calculate the height of displayed books
  // const books = document.querySelector('[data-books]')
  // if (books && window.innerWidth > 1024) {
  //   setTimeout(() => {
  //     const booksContainer = document.querySelector('[data-books-container]')
  //     if (booksContainer.offsetHeight > 650) {
  //       const booksContainerHeight = booksContainer.offsetHeight + 229
  //       books.style.height = `${booksContainerHeight}px`
  //     }

  //     window.addEventListener('resize', () => {
  //       const booksContainer = document.querySelector('[data-books-container]')
  //       if (booksContainer.offsetHeight > 650) {
  //         const booksContainerHeight = booksContainer.offsetHeight + 229
  //         books.style.height = `${booksContainerHeight}px`
  //       }
  //     })
  //   }, 200)
  // }
}
