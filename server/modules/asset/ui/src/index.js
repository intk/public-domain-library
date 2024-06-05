import { DotLottie } from '@lottiefiles/dotlottie-web'

export default () => {
  apos.util.onReady(async () => {
    /********************************/
    /* start header logo animation */
    /*******************************/
    const headerTitle = document.querySelector('.pdl-header__title')
    const headerLottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-header-animation.json'))
    const headerJsonData = await headerLottieFile.json()
    const headerDotLottie = new DotLottie({
      autoplay: false,
      loop: true,
      canvas: document.querySelector('.pdl-header__logo'),
      data: headerJsonData,
    })
    headerTitle.addEventListener('mouseenter', () => {
      headerDotLottie.play()
    })
    headerTitle.addEventListener('mouseleave', () => {
      headerDotLottie.stop()
    })
    /********************************/
    /*  end header logo animation  */
    /*******************************/

    /********************************/
    /* start footer logo animation */
    /*******************************/
    const footerTitle = document.querySelector('.pdl-footer__sentence')
    const footerLottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-footer-animation.json'))
    const footerJsonData = await footerLottieFile.json()
    const footerDotLottie = new DotLottie({
      autoplay: false,
      loop: true,
      canvas: document.querySelector('.pdl-footer__logo'),
      data: footerJsonData,
    })
    footerTitle.addEventListener('mouseenter', () => {
      footerDotLottie.play()
    })
    footerTitle.addEventListener('mouseleave', () => {
      footerDotLottie.pause()
    })
    /********************************/
    /*  end footer logo animation  */
    /*******************************/

    /***********************/
    /*  start mobile nav  */
    /**********************/
    const openMobileNavButton = document.querySelector('[data-open-mobile-nav]')
    const closeMobileNavButton = document.querySelector('[data-close-mobile-nav]')
    const mobileNav = document.querySelector('[data-mobile-nav]')

    setTimeout(() => {
      if (window.apos?.scene === 'apos') {
        mobileNav.style.top = `${apos.modules['@apostrophecms/admin-bar'].height}px`
      }
    }, 0)

    if (openMobileNavButton) {
      openMobileNavButton.addEventListener('click', () => {
        mobileNav.classList.add('pdl-mobile-nav--open')
        closeMobileNavButton.classList.add('pdl-mobile-nav__close--display')
        closeMobileNavButton.classList.remove('pdl-mobile-nav__close--hide')
      })
    }

    if (closeMobileNavButton) {
      closeMobileNavButton.addEventListener('click', () => {
        mobileNav.classList.remove('pdl-mobile-nav--open')
        closeMobileNavButton.classList.add('pdl-mobile-nav__close--hide')
        closeMobileNavButton.classList.remove('pdl-mobile-nav__close--display')
      })
    }
    /***********************/
    /*   end mobile nav   */
    /**********************/
  })
}
