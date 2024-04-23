export default () => {
  apos.util.onReady(() => {
    const localeSwitcher = document.querySelector('[data-locale-switcher]')

    if (localeSwitcher) {
      localeSwitcher.addEventListener('click', () => {
        const localeList = document.querySelector('[data-locale-list]')
        console.log('localeList.style.display ====> ', localeList.style.display)
        const display = localeList.style.display || 'none'
        localeList.style.display = display === 'none' ? 'flex' : 'none'
      })
    }
  })
}
