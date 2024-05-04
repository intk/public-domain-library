import { DotLottie } from '@lottiefiles/dotlottie-web'

export default () => {
  apos.util.onReady(async () => {
    const headerTitle = document.querySelector('.pdl-header__title')
    const headerLottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-header-animation.json'))
    const headerJsonData = await headerLottieFile.json()
    const headerDotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector('.pdl-header__logo'),
      data: headerJsonData
    })
    headerTitle.addEventListener('mouseenter', () => {
      headerDotLottie.stop()
    })
    headerTitle.addEventListener('mouseleave', () => {
      headerDotLottie.play()
    })

    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector('.pdl-header__logo--mobile'),
      data: headerJsonData
    })

    const footerTitle = document.querySelector('.pdl-footer__sentence')
    const footerLottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-footer-animation.json'))
    const footerJsonData = await footerLottieFile.json()
    const footerDotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector('.pdl-footer__logo'),
      data: footerJsonData
    })
    footerTitle.addEventListener('mouseenter', () => {
      footerDotLottie.stop()
    })
    footerTitle.addEventListener('mouseleave', () => {
      footerDotLottie.play()
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
        sideNav.style.transform = 'translateY(0)';
        closeSideNavButton.classList.add('pdl-side-nav__close--display')
        closeSideNavButton.classList.remove('pdl-side-nav__close--hide')
      })
    }

    if (closeSideNavButton) {
      closeSideNavButton.addEventListener('click', () => {
        sideNav.style.transform = 'translateY(-100%)';
        closeSideNavButton.classList.add('pdl-side-nav__close--hide')
        closeSideNavButton.classList.remove('pdl-side-nav__close--display')
      })
    }
  })
}
