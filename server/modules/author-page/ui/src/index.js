export default () => {
  const author = document.querySelector('.pdl-authors__nav-letter--A')
  if (author) {
    author.classList.add('highlight')
  }

  const authors = document.querySelectorAll('.pdl-authors__nav-letter')
  authors.forEach(author => {
    author.addEventListener('click', () => {
      authors.forEach(a => a.classList.remove('highlight'))
      author.classList.add('highlight')
    })
  })
}
