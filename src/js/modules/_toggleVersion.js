'use strict'

export function toggleVersion() {
	const buttonsTab = document.querySelectorAll('[data-tab]')
	const toggleTabs = document.querySelectorAll('[data-toggle]')
	const openPopupButtons = document.querySelectorAll('[data-openmodal]')
	const body = document.querySelector('body')

	const initTabsButtons = () => {
		const version = localStorage.getItem('version')

		if (version === 'man') {
			buttonsTab.forEach(el => el.classList.remove('active'))
			buttonsTab.forEach(el => {
				if (el.dataset.tab === 'man') el.classList.add('active')
			})
		} else if (version === 'woman') {
			buttonsTab.forEach(el => el.classList.remove('active'))
			buttonsTab.forEach(el => (el.dataset.tab === 'woman') ? el.classList.add('active') : null)
		}
	}

	initTabsButtons()

	const initVersion = (parrent, elementsToggle) => {
		const version = localStorage.getItem('version')
		if (version === 'man') {
			parrent.classList.add('man-version')

			elementsToggle.forEach(el => {
				if (el.dataset.toggle === 'woman') {
					el.style.display = 'none'
				} else if (el.dataset.toggle === 'man') {
					el.style.display = null
				}
			})
		} else if (version === 'woman') {
			parrent.classList.add('woman-version')

			elementsToggle.forEach(el => {
				if (el.dataset.toggle === 'man') {
					el.style.display = 'none'
				} else if (el.dataset.toggle === 'woman') {
					el.style.display = null
				}
			})
		}
	}

	initVersion(body, toggleTabs)

	buttonsTab.forEach(btn => {
		btn.addEventListener('click', (e) => {
			let target = e.target
			// buttonsTab.forEach(el => el.classList.remove('active'))
			// target.classList.add('active')

			if (target.dataset.tab === 'woman') {
				// openPopupButtons.forEach(el => el.setAttribute('data-version', 'woman'))
				body.classList.add('woman-version')
				body.classList.remove('man-version')

				localStorage.setItem('version', 'woman')
				initVersion(body, toggleTabs)
				initTabsButtons()
				// toggleTabs.forEach(el => {
				// 	if (el.dataset.toggle === 'man') {
				// 		el.style.display = 'none'
				// 	} else if (el.dataset.toggle === 'woman') {
				// 		el.style.display = null
				// 	}
				// })
			}

			if (target.dataset.tab === 'man') {
				// openPopupButtons.forEach(el => el.setAttribute('data-version', 'man'))
				body.classList.add('man-version')
				body.classList.remove('woman-version')

				localStorage.setItem('version', 'man')
				initVersion(body, toggleTabs)
				initTabsButtons()
				// toggleTabs.forEach(el => {
				// 	if (el.dataset.toggle === 'woman') {
				// 		el.style.display = 'none'
				// 	} else if (el.dataset.toggle === 'man') {
				// 		el.style.display = null
				// 	}
				// })
			}
		})
	})
}