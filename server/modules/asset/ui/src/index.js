import { DotLottie } from '@lottiefiles/dotlottie-web'

export default () => {
  apos.util.onReady(async () => {
    const title = document.querySelector('.pdl-header__title')
    const lottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-header-animation.json'))
    const jsonData = await lottieFile.json()

    const dotLottie = new DotLottie({
        autoplay: false,
        loop: true,
        canvas: document.querySelector('.pdl-header__logo'),
        data: jsonData
    })

    title.addEventListener('mouseenter', () => {
      dotLottie.play()
    })
    title.addEventListener('mouseleave', () => {
      dotLottie.stop()
    })

    const openSideNavButton = document.querySelector('[data-open-side-nav]')
    const closeSideNavButton = document.querySelector('[data-close-side-nav]')
    const sideNav = document.querySelector('[data-side-nav]')

    setTimeout(() => {
      if (window.apos?.scene === 'apos') {
        sideNav.style.top = `${apos.modules['@apostrophecms/admin-bar'].height}px`
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
