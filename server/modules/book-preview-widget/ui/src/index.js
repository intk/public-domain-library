export default () => {
  apos.util.widgetPlayers['book-preview-widget'] = {
    selector: '[data-book-preview-widget]',
    player: function (el) {
      const innerWidth = window.innerWidth
      window.addEventListener('resize', () => {
        setTimeout(() => {
          const newInnerWidth = window.innerWidth
          if ((innerWidth < 1025 && newInnerWidth >= 1025) || (innerWidth >= 1025 && newInnerWidth < 1025)) {
            window.location.reload()
          }
        }, 250)
      })

      if (window.innerWidth < 1025) {
        const container = el.querySelector('.pdl-book-previews__container')
        const previews = el.querySelector('.pdl-book-previews')
        const formatsLists = el.querySelectorAll('.pdl-book-preview__formats')
        const clonedNodes = document.createElement('div')
        clonedNodes.classList.add('pdl-book-preview__cloned-nodes')
        previews.appendChild(clonedNodes)

        const allClonedNodes = document.querySelectorAll('.pdl-book-preview__cloned-nodes')
        setTimeout(() => {
          document.addEventListener('click', deleteClonedNodes)
        }, 500)
        container.addEventListener('wheel', deleteClonedNodes)

        if (formatsLists?.length) {
          for (const formatsList of formatsLists) {
            const displayList = formatsList.querySelector('[data-book-formats-list]')

            const originalSecondLink = formatsList.querySelector('.pdl-book-preview__format--second')
            const originalThirdLink = formatsList.querySelector('.pdl-book-preview__format--third')

            if (displayList) {
              displayList.addEventListener('click', (evt) => {
                const formatsListTop = getAbsolutePosition(formatsList).top
                const formatsListLeft = formatsList.getBoundingClientRect().left

                // recreate the second link and append it to the document
                const secondLink = originalSecondLink.cloneNode(true)
                secondLink.classList.toggle('pdl-book-preview__format--visible')
                secondLink.style.position = 'absolute'
                secondLink.style.top = `${formatsListTop + formatsList.offsetHeight + 1}px`
                secondLink.style.left = `${formatsListLeft}px`
                secondLink.style.backgroundColor = 'black'
                secondLink.style.color = 'white'
                secondLink.style.width = '126px'
                secondLink.style.padding = '12px 8px'
                secondLink.style.transition = 'color 0.3s, background-color 0.3s, transform 0.3s'
                secondLink.style.borderTopLeftRadius = '4px'
                secondLink.style.borderTopRightRadius = '4px'
                secondLink.style.zIndex = 4
                secondLink.style.display = 'block'

                clonedNodes.appendChild(secondLink)

                // same thing for the third link
                const thirdLink = originalThirdLink.cloneNode(true)
                thirdLink.classList.toggle('pdl-book-preview__format--visible')
                thirdLink.style.position = 'absolute'
                thirdLink.style.top = `${formatsListTop + formatsList.offsetHeight + secondLink.offsetHeight + 2}px`
                thirdLink.style.left = `${formatsListLeft}px`
                thirdLink.style.backgroundColor = 'black'
                thirdLink.style.color = 'white'
                thirdLink.style.width = '126px'
                thirdLink.style.padding = '12px 8px'
                thirdLink.style.transition = 'color 0.3s, background-color 0.3s, transform 0.3s'
                thirdLink.style.borderBottomLeftRadius = '4px'
                thirdLink.style.borderBottomRightRadius = '4px'
                thirdLink.style.zIndex = 4
                thirdLink.style.display = 'block'
                clonedNodes.appendChild(thirdLink)
              })
            }
          }
        }

        function deleteClonedNodes () {
          for (const clonedNodes of allClonedNodes) {
            while (clonedNodes.firstChild) {
              clonedNodes.removeChild(clonedNodes.firstChild)
            }
          }
        }

        function fGetCSSProperty (s, e) {
          return s.currentStyle ? s.currentStyle[e] : window.getComputedStyle(s)[e]
        }

        function fGetOffSetParent (s) {
          let a = s.offsetParent || document.body
          while (a && a.tagName && a !== document.body && fGetCSSProperty(a, 'position') === 'static') {
            a = a.offsetParent
          }
          return a
        }

        function getAbsolutePosition (s) {
          const b = fGetOffSetParent(s)
          return {
            left: (b.offsetLeft + s.offsetLeft),
            top: (b.offsetTop + s.offsetTop),
          }
        }
      }
    },
  }
}
