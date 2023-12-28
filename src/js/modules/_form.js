'use strict'
export function sendForm() {
	const forms = document.querySelectorAll('form')
	const priceDisplay = document.querySelector('#priceDisplay')

	const formPopupBodyOrder = document.querySelector('.form-popup__wrapper-order')
	const formPopupBodysuccess = document.querySelector('.form-popup__wrapper-success')
	const formPopupBodyError = document.querySelector('.form-popup__wrapper-error')

	forms.forEach(form => {
		form.addEventListener('submit', async (e) => {
			e.preventDefault()

			const formData = new FormData(form)
			const selectedPrice = priceDisplay.textContent
			const version = localStorage.getItem('version')

			formData.append('selectedPrice', selectedPrice)
			formData.append('selectedVersion', version)

			try {
				const response = await fetch('../../vendor/send.php', {
					method: 'POST',
					body: formData,
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const result = await response.json()

				formPopupBodyOrder.classList.add('_hidden-wrapper')
				formPopupBodysuccess.classList.remove('_hidden-wrapper')
			} catch (error) {
				console.error('Error during form submission:', error)

				formPopupBodyOrder.classList.add('_hidden-wrapper')
				formPopupBodyError.classList.remove('_hidden-wrapper')
			}
		})
	})

	const applyMask = (el, mask) => {
		const def = mask.replace(/\D/g, "")
		let i = 0
		let val = el.value.replace(/\D/g, "")

		if (el.dataset.phoneClear !== 'false' && el.type === 'blur') {
			if (val.length < mask.match(/([\_\d])/g).length) {
				el.value = ''
				return
			}
		}

		if (def.length >= val.length) val = def
		el.value = mask.replace(/./g, (a) => {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		})
	}

	const handlePhoneInput = (e) => {
		const el = e.target
		const pattern = el.dataset.phonePattern || "+7(___) ___-__-__"
		applyMask(el, pattern)
	}

	const phoneInputs = document.querySelectorAll('[data-phone-pattern]')

	phoneInputs.forEach((elem) => {
		['input', 'blur', 'focus'].forEach((ev) => {
			elem.addEventListener(ev, handlePhoneInput)
		})
	})
}