export default () => {
  // index page
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

  // show page
  const info = document.querySelector('.pdl-author__copyright-info')
  if (info) {
    const authorPage = document.querySelector('.pdl-author')
    const copyrightTerm = document.querySelector('.pdl-author__copyright-term')
    const copyrightContent = document.querySelector('.pdl-author__copyright-content')
    const svgs = document.querySelectorAll('.st1')

    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pdl-author__copyright-info')) {
        if (!authorPage.classList.contains('overlay')) {
          dimPage()
        } else {
          unDimPage()
        }
      } else {
        unDimPage()
      }
    })

    info.addEventListener('mouseover', () => {
      setTimeout(() => {
        dimPage()
      }, 200)
    })
    info.addEventListener('mouseout', () => {
      unDimPage()
    })

    function dimPage () {
      info.classList.add('pdl-author__copyright-info--hover')
      authorPage.classList.add('overlay')
      copyrightContent.classList.add('pdl-author__copyright-content--visible')
      copyrightTerm.classList.add('pdl-author__copyright-term--hover')
      svgs.forEach(svg => {
        svg.classList.add('st1--hover')
      })
    }

    function unDimPage () {
      info.classList.remove('pdl-author__copyright-info--hover')
      authorPage.classList.remove('overlay')
      copyrightContent.classList.remove('pdl-author__copyright-content--visible')
      copyrightTerm.classList.remove('pdl-author__copyright-term--hover')
      svgs.forEach(svg => {
        svg.classList.remove('st1--hover')
      })
    }
  }
}
