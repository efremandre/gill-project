'use strict'

export function setCurrent() {
	const openPopupButtons = document.querySelectorAll('[data-openmodal]')
	const formButton = document.querySelectorAll('.form__button')
	const buttons = document.querySelectorAll('.form__button')
	const priceDisplay = document.querySelector('#priceDisplay')
	const cartCurrent = document.querySelector('.cart__current')

	if (!localStorage.getItem('quantity')) localStorage.setItem('quantity', 3)
	if (!localStorage.getItem('price')) localStorage.setItem('price', 2999)

	cartCurrent.textContent = `${localStorage.getItem('quantity')}`
	priceDisplay.textContent = `${localStorage.getItem('price')}`

	buttons.forEach(button => {

		if (button.dataset.quantity === localStorage.getItem('quantity')) {
			buttons.forEach(btn => btn.classList.remove('active'))
			button.classList.add('active')
		}

		button.addEventListener('click', () => {

			buttons.forEach(btn => btn.classList.remove('active'))
			button.classList.add('active')

			const selectedPrice = button.dataset.price
			const selectedQuantity = button.dataset.quantity

			localStorage.setItem('price', selectedPrice)
			localStorage.setItem('quantity', selectedQuantity)

			const localPrice = localStorage.getItem('price')
			const localQuantity = localStorage.getItem('quantity')

			priceDisplay.textContent = `${localPrice}`
			cartCurrent.textContent = `${localQuantity}`
		})
	})

	openPopupButtons.forEach(el => {
		el.addEventListener('click', () => {
			let valueBtn = el.dataset.openmodal
			localStorage.setItem('quantity', valueBtn)
			cartCurrent.innerText = localStorage.getItem('quantity')

			formButton.forEach(btnForm => {
				if (btnForm.dataset.quantity === valueBtn) {
					formButton.forEach(el => el.classList.remove('active'))
					btnForm.classList.add('active')
					priceDisplay.innerText = localStorage.getItem('price')
				}
			})
		})
	})
}