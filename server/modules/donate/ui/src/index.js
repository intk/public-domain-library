export default () => {
  apos.util.widgetPlayers['data-donate-form'] = {
    selector: '.pdl-donate__form',
    player: function (el) {
      const submitButton = el.querySelector('.pdl-donate__button')

      el.addEventListener('submit', (evt) => {
        const formData = new FormData(el)
        const data = Object.fromEntries(formData)
        if (!data.amount) {
          evt.preventDefault()
        }
      })

      const amounts = el.querySelectorAll('.pdl-donate__amount-button')
      for (const amount of amounts) {
        amount.addEventListener('click', () => {
          const selected = el.querySelector('.pdl-donate__amount-button--selected')
          if (selected) {
            selected.classList.remove('pdl-donate__amount-button--selected')
            el.querySelector('input#amount').value = ''
            submitButton.classList.add('pdl-donate__button--disabled')
          } else {
            amount.classList.add('pdl-donate__amount-button--selected')
            el.querySelector('input#amount').value = amount.textContent.split('$')[0]
            submitButton.classList.remove('pdl-donate__button--disabled')
          }
        })
      }

      const customAmount = el.querySelector('#custom-amount')
      customAmount.addEventListener('click', () => {
        for (const amount of amounts) {
          amount.classList.remove('pdl-donate__amount-button--selected')
          el.querySelector('input#amount').value = ''
          submitButton.classList.add('pdl-donate__button--disabled')
        }
      })
      customAmount.addEventListener('input', () => {
        if (customAmount.value && customAmount.value > 0) {
          submitButton.classList.remove('pdl-donate__button--disabled')
        } else {
          submitButton.classList.add('pdl-donate__button--disabled')
        }
      })
      customAmount.addEventListener('change', () => {
        el.querySelector('input#amount').value = customAmount.value
      })
    },
  }
}
