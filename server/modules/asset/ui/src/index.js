import { DotLottie } from '@lottiefiles/dotlottie-web'

export default () => {
  apos.util.onReady(async () => {
    const ua = window.navigator.userAgent
    console.log('ua ====> ', ua)
    const iosDevice = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i) || (!!ua.match(/Macintosh/i) && !ua.match(/Chrome/i))
    if (iosDevice) {
      document.body.classList.add('pdl-ios-device')
    }

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
    const footerLogo = document.querySelector('.pdl-footer__logo')
    const footerLottieFile = await fetch(apos.util.assetUrl('/modules/asset/logo-footer-animation.json'))
    const footerJsonData = await footerLottieFile.json()
    const footerDotLottie = new DotLottie({
      autoplay: false,
      loop: true,
      canvas: footerLogo,
      data: footerJsonData,
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerDotLottie.play()
        } else {
          footerDotLottie.pause()
        }
      })
    })
    observer.observe(footerLogo)
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

        // hide hamburger icon
        openMobileNavButton.classList.add('pdl-mobile-nav__burger--hide')
        openMobileNavButton.classList.remove('pdl-mobile-nav__burger--display')

        // display cross icon
        closeMobileNavButton.classList.add('pdl-mobile-nav__close--display')
        closeMobileNavButton.classList.remove('pdl-mobile-nav__close--hide')
      })
    }

    if (closeMobileNavButton) {
      closeMobileNavButton.addEventListener('click', () => {
        mobileNav.classList.remove('pdl-mobile-nav--open')

        // display hamburger icon
        openMobileNavButton.classList.remove('pdl-mobile-nav__burger--hide')
        openMobileNavButton.classList.add('pdl-mobile-nav__burger--display')

        // hide cross icon
        closeMobileNavButton.classList.add('pdl-mobile-nav__close--hide')
        closeMobileNavButton.classList.remove('pdl-mobile-nav__close--display')
      })
    }
    /***********************/
    /*   end mobile nav   */
    /**********************/

    /***************************/
    /*  start desktop search  */
    /**************************/
    const searchIcon = document.querySelector('[data-search-icon]')
    const searchInput = document.querySelector('[data-search-input]')
    searchIcon.addEventListener('click', () => {
      searchIcon.classList.toggle('pdl-nav__item--open')
      searchInput.focus()
      searchInput.classList.toggle('pdl-nav__input--open')
    })
    /************************/
    /*  end desktop search  */
    /************************/
  })
}
