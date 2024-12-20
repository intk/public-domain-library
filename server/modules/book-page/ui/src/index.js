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
        const previewViewButton = preview.querySelector('[data-book-preview-view]')
        if (previewViewButton) {
          previewViewButton.classList.add('pdl-book-preview__view--visible')
        }
      })
    }
  }

  let isDown = false
  let startX
  let scrollLeft
  const container = document.querySelector('.pdl-book-previews__container')
  if (container) {
    const elements = container.querySelectorAll('.pdl-book-preview')
    const elementsWrapper = container.querySelector('.pdl-book-previews')

    container.addEventListener('mousedown', e => {
      isDown = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    })

    container.addEventListener('mouseup', e => {
      isDown = false
      elementsWrapper.style.cursor = 'grab'
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.pointerEvents = 'auto'
      }
    })

    container.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk

      elementsWrapper.style.cursor = 'grabbing'

      for (let i = 0; i < elements.length; i++) {
        elements[i].style.pointerEvents = 'none'
      }
    })
  }
}
