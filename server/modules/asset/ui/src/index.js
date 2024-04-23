export default () => {
  apos.util.onReady(() => {
    const openSideNavButton = document.querySelector('[data-open-side-nav]')
    const closeSideNavButton = document.querySelector('[data-close-side-nav]')
    const sideNav = document.querySelector('[data-side-nav]')

    setTimeout(() => {
      const adminBar = document.querySelector('#apos-admin-bar')
      if (adminBar) {
        sideNav.style.top = `${adminBar.clientHeight}px`
      }
    }, 0)

    if (openSideNavButton) {
      openSideNavButton.addEventListener('click', () => {
        sideNav.style.width = '250px'
      })
    }

    if (closeSideNavButton) {
        closeSideNavButton.addEventListener('click', () => {
        sideNav.style.width = '0'
      })
    }
  })
}
