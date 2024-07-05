export default () => {
  // highlight A by default
  const letterA = document.querySelector('.pdl-authors__nav-letter--A')
  if (letterA) {
    letterA.classList.add('highlight')
  }

  observeVisibleLetter()

  function observeVisibleLetter () {
    const letters = document.querySelectorAll('.pdl-authors__letter')
    const navLetters = document.querySelectorAll('.pdl-authors__nav-letter')
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }

    const callback = (entries, observer) => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        history.pushState('', document.title, window.location.pathname)
        const visibleLetter = document.getElementById(hash)
        navLetters.forEach(navLetter => {
          navLetter.classList.remove('highlight')
          if (navLetter.innerHTML === visibleLetter.id) {
            navLetter.classList.add('highlight')
          }
        })

        return
      }

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const visibleLetter = entry.target
          navLetters.forEach(navLetter => {
            navLetter.classList.remove('highlight')
            if (navLetter.innerHTML === visibleLetter.id) {
              navLetter.classList.add('highlight')
            }
          })
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)
    letters.forEach(letter => observer.observe(letter))
  }
}
