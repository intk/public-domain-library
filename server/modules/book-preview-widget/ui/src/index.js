export default () => {
  apos.util.widgetPlayers['book-preview-widget'] = {
    selector: '[data-book-preview-widget]',
    player: function (el) {
      const innerWidth = window.innerWidth
      window.addEventListener('resize', () => {
        setTimeout(() => {
          const newInnerWidth = window.innerWidth
          cloneNodes(newInnerWidth)
        }, 250)
      })

      cloneNodes(innerWidth)

      function cloneNodes (innerWidth) {
        const container = el.querySelector('.pdl-book-previews__container')
        if (innerWidth < 1025) {
          const previews = el.querySelector('.pdl-book-previews')
          const formatsLists = el.querySelectorAll('.pdl-book-preview__formats')
          const clonedNodes = document.createElement('div')
          clonedNodes.classList.add('pdl-book-preview__cloned-nodes')
          previews.appendChild(clonedNodes)

          setTimeout(() => {
            document.addEventListener('click', deleteClonedNodes)
          }, 500)
          container.addEventListener('wheel', deleteClonedNodes)
          container.addEventListener('scroll', deleteClonedNodes)

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
        } else {
          // removed all cloned nodes event listeners
          document.removeEventListener('click', deleteClonedNodes)
          container.removeEventListener('wheel', deleteClonedNodes)
          container.removeEventListener('scroll', deleteClonedNodes)

          // removed all cloned nodes
          const clonedNodes = el.querySelectorAll('.pdl-book-preview__cloned-nodes')
          for (const clonedNode of clonedNodes) {
            clonedNode.remove()
          }

          let isDown = false
          let startX
          let scrollLeft
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

        function deleteClonedNodes () {
          const allClonedNodes = el.querySelectorAll('.pdl-book-preview__cloned-nodes')
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
