export default () => {
  apos.util.onReady(() => {
    const sections = document.querySelectorAll('.pdl-locale-switcher')

    if (sections.length) {
      for (const section of sections) {
        const localeSwitcher = section.querySelector('[data-locale-switcher]')
        localeSwitcher.addEventListener('click', () => {
          const localeList = section.querySelector('[data-locale-list]')
          const display = localeList.style.display || 'none'
          localeList.style.display = display === 'none' ? 'flex' : 'none'
          localeSwitcher.style.borderColor = display === 'none' ? '#808080' : 'white'
          localeList.classList.toggle('pdl-locale-switcher__list--animate')
        })

        section.addEventListener('mouseenter', () => {
          localeSwitcher.classList.add('pdl-locale-switcher--hover-in')
          localeSwitcher.classList.remove('pdl-locale-switcher--hover-out')
        })

        section.addEventListener('mouseleave', () => {
          localeSwitcher.classList.remove('pdl-locale-switcher--hover-in')
          localeSwitcher.classList.add('pdl-locale-switcher--hover-out')
        })
      }
    }
  })
}
