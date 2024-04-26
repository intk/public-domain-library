export default () => {
  apos.util.onReady(() => {
    const localeSwitcher = document.querySelector('[data-locale-switcher]')

    if (localeSwitcher) {
      localeSwitcher.addEventListener('click', () => {
        const localeList = document.querySelector('[data-locale-list]')
        const display = localeList.style.display || 'none'
        localeList.style.display = display === 'none' ? 'flex' : 'none'
        localeSwitcher.style.borderColor = display === 'none' ? '#808080' : 'white'
        localeList.classList.toggle('pdl-locale-switcher__list--animate')
      })
    }
  })
}
