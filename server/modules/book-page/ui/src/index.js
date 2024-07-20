export default () => {
  const formatsLists = document.querySelectorAll('.pdl-book-preview__formats')
  if (formatsLists?.length) {
    for (const formatsList of formatsLists) {
      const displayList = formatsList.querySelector('[data-book-formats-list]')
      displayList.addEventListener('click', () => {
        const secondFormat = formatsList.querySelector('.pdl-book-preview__format--second')
        const thirdFormat = formatsList.querySelector('.pdl-book-preview__format--third')

        secondFormat.classList.toggle('pdl-book-preview__format--visible')
        thirdFormat.classList.toggle('pdl-book-preview__format--visible')
      })
    }
  }
}
