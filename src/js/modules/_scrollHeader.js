'use strict'
export function scrollHeader() {
	let lastScroll = 0
	const header = document.querySelector('[data-header]')
	const hero = document.querySelector('.hero')

	if (header && hero) {
		const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop
		const containHide = () => header.classList.contains('_hidden')
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > hero.offsetHeight) {
				if (scrollPosition() > lastScroll && !containHide()) {
					header.classList.add('_hidden')
				} else if (scrollPosition() < lastScroll && containHide()) {
					header.classList.remove('_hidden')
				}

				lastScroll = scrollPosition()
			}
		})

		header.addEventListener('mouseenter', () => {
			if (header.classList.contains('_hidden')) header.classList.remove('_hidden')
		})
	}
}