export default () => {
  apos.util.widgetPlayers['highlight-items-widget'] = {
    selector: '[data-highlight-items-widget]',
    player: function (el) {
      let slideIndex = 1
      const dots = el.getElementsByClassName('pdl-highlight-widget__slider')
      showSlides(slideIndex)

      for (const dot of dots) {
        dot.addEventListener('click', function (e) {
          const index = Array.from(e.target.parentElement.children).indexOf(e.target)
          showSlides(slideIndex = index + 1)
        })
      }

      function showSlides (n) {
        let i
        const slides = el.getElementsByClassName('pdl-highlight-widget__item')
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none'
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace('--active', '')
        }
        slides[slideIndex - 1].style.display = 'flex'
        dots[slideIndex - 1].className += '--active'
      }
    },
  }
}
