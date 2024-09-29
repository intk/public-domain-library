export default () => {
  apos.util.widgetPlayers['data-donate-form'] = {
    selector: '.pdl-donate__form',
    player: function (el) {
      const submitButton = el.querySelector('.pdl-donate__submit')

      el.addEventListener('submit', (evt) => {
        const formData = new FormData(el)
        const data = Object.fromEntries(formData)
        if (!data.amount || data.amount < 0.6) {
          evt.preventDefault()
        }
      })

      const customAmount = el.querySelector('#custom-amount')
      const amounts = el.querySelectorAll('.pdl-donate__amount-button')
      for (const amount of amounts) {
        amount.addEventListener('click', () => {
          const selected = el.querySelector('.pdl-donate__amount-button--selected')
          selected?.classList.remove('pdl-donate__amount-button--selected')

          if (selected?.id === amount.id) {
            // If the same amount is clicked again, clear the input
            el.querySelector('input#amount').value = ''
            submitButton.classList.add('pdl-donate__submit--disabled')
          } else {
            // If a different amount is clicked, set the input value
            customAmount.value = ''
            amount.classList.add('pdl-donate__amount-button--selected')
            el.querySelector('input#amount').value = amount.textContent.split('$')[0]
            submitButton.classList.remove('pdl-donate__submit--disabled')
          }
        })
      }

      customAmount.addEventListener('click', () => {
        for (const amount of amounts) {
          amount.classList.remove('pdl-donate__amount-button--selected')
          el.querySelector('input#amount').value = ''
          submitButton.classList.add('pdl-donate__submit--disabled')
        }
      })
      customAmount.addEventListener('input', () => {
        if (customAmount.value && customAmount.value >= 0.6) {
          submitButton.classList.remove('pdl-donate__submit--disabled')
        } else {
          submitButton.classList.add('pdl-donate__submit--disabled')
        }
      })
      customAmount.addEventListener('change', () => {
        el.querySelector('input#amount').value = customAmount.value
      })
    },
  }
}
