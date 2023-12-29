'use strict'

export function modal() {

	const openPopupButtons = document.querySelectorAll('[data-openmodal]')
	const formPopupClose = document.querySelectorAll('[data-closemodal]')
	const formPopupErrorBtn = document.querySelector('[data-error]')
	const formPopup = document.querySelector('.form-popup')
	const formPopupBody = document.querySelector('.form-popup__body')
	const formPopupBodyOrder = document.querySelector('.form-popup__wrapper-order')
	const formPopupBodySuccess = document.querySelector('.form-popup__wrapper-success')
	const formPopupBodyError = document.querySelector('.form-popup__wrapper-error')
	const priceDisplay = document.querySelector('#priceDisplay')


	const body = document.body
	const header = document.querySelector('.header')

	const openPopupHandler = (e) => {
		let target = e.target

		if (target.dataset.openmodal === "3") {
			localStorage.setItem('price', 2999)
		} else if (target.dataset.openmodal === "9") {
			localStorage.setItem('price', 3999)
		} else if (target.dataset.openmodal === "15") {
			localStorage.setItem('price', 4999)
		} else if (target.dataset.openmodal === "cart") {
			null
		}

		priceDisplay.innerHTML = `${localStorage.getItem('price')}`

		formPopup.classList.add('open')
		const paddingRightValue = `${window.innerWidth - document.documentElement.clientWidth}px`
		body.style.paddingRight = paddingRightValue
		header.style.paddingRight = paddingRightValue
		body.classList.add('stop-scroll')

		setTimeout(() => {
			formPopupBody.classList.add('open')
		}, 300)
	}

	const closePopupHandler = () => {

		formPopupBody.classList.remove('open')
		const formInput = formPopupBody.querySelectorAll('.form__input input')
		formInput.forEach(el => el.value = '')
		formPopupBodySuccess.classList.add('_hidden-wrapper')
		formPopupBodyOrder.classList.remove('_hidden-wrapper')

		setTimeout(() => {
			formPopup.classList.remove('open')
			body.classList.remove('stop-scroll')
			body.style.paddingRight = '0'
			header.style.paddingRight = '0'
		}, 500)
	}

	const closePopupError = () => {
		formPopupBodyError.classList.add('_hidden-wrapper')
		formPopupBodyOrder.classList.remove('_hidden-wrapper')
	}

	const outsideClickHandler = (event) => {

		if (event.target.classList.contains('form-popup__body')) {
			const formInput = formPopupBody.querySelectorAll('.form__input input')
			formInput.forEach(el => el.value = '')
			formPopupBody.classList.remove('open')
			formPopupBodyOrder.classList.remove('_hidden-wrapper')
			formPopupBodySuccess.classList.add('_hidden-wrapper')
			formPopupBodyError.classList.add('_hidden-wrapper')

			setTimeout(() => {
				formPopup.classList.remove('open')
				body.classList.remove('stop-scroll')
				body.style.paddingRight = '0'
				header.style.paddingRight = '0'
			}, 500)
		}
	}

	openPopupButtons.forEach((button) => {
		button.addEventListener('click', openPopupHandler)
	})

	formPopupClose.forEach((button) => {
		button.addEventListener('click', closePopupHandler)
	})

	formPopupErrorBtn.addEventListener('click', closePopupError)
	formPopup.addEventListener('click', outsideClickHandler)
}