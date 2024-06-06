export default () => {
  apos.util.onReady(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const sections = document.querySelectorAll('.pdl-locale-switcher')

    if (sections.length) {
      for (const section of sections) {
        const localeSwitcher = section.querySelector('[data-locale-switcher]')
        const localeList = section.querySelector('[data-locale-list]')

        localeSwitcher.addEventListener('click', () => {
          const display = localeList.style.display || 'none'
          localeList.style.display = display === 'none' ? 'flex' : 'none'
          localeSwitcher.style.borderColor = display === 'none' ? '#808080' : 'white'
          !isSafari && localeList.classList.toggle('pdl-locale-switcher__list--animate')
        })

        section.addEventListener('mouseenter', () => {
          localeSwitcher.classList.add('pdl-locale-switcher--hover-in')
          localeSwitcher.classList.remove('pdl-locale-switcher--hover-out')
        })

        section.addEventListener('mouseleave', () => {
          localeSwitcher.classList.remove('pdl-locale-switcher--hover-in')
          localeSwitcher.classList.add('pdl-locale-switcher--hover-out')
        })

        document.addEventListener('click', (event) => {
          if (!event.target.closest('[data-locale-switcher]') && localeList.classList.contains('pdl-locale-switcher__list--animate')) {
            localeList.style.display = 'none'
            localeSwitcher.style.borderColor = '#808080'
            localeList.classList.remove('pdl-locale-switcher__list--animate')
          }
        })
      }
    }
  })
}
