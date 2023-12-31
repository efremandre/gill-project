import { disabledBtnForm } from './modules/_disabledBtnForm.js'
import { sendForm } from './modules/_form.js'
import { hello } from './modules/_hello.js'
import { initSlider } from './modules/_initSlider.js'
import { modal } from './modules/_modal.js'
import { pressUp } from './modules/_pressUp.js'
import { setCurrent } from './modules/_setCurrent.js'
import { initialState } from './modules/_state.js'
import { timer } from './modules/_timer.js'
import { toggleVersion } from './modules/_toggleVersion.js'

hello()
toggleVersion()
initialState()
timer()
toggleVersion()
setCurrent()
modal()
initSlider()
pressUp()
disabledBtnForm()
sendForm()

window.addEventListener('scroll', function () {
	if (pageYOffset > 50) {
		document.querySelector('.header').classList.add('_active')
	} else {
		document.querySelector('.header').classList.remove('_active')
	}
})




function getCurrentTime() {
	const now = new Date()
	const hours = now.getHours()
	const minutes = now.getMinutes()
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

const fettchPush = async () => {
	const time = getCurrentTime()
	const containerPush = document.querySelector('.tobuy__feedbacks')
	try {
		const response = await fetch('../files/data.json')
		const data = await response.json()

		if (!response.ok) {
			const div = document.createElement('div')
			div.innerHTML = `<img src='https://i.gifer.com/VAyR.gif'>`
			containerPush.append(div)
		} else {
			data.forEach((push, index) => {
				const div = document.createElement('div')

				if (index % 2 === 0) { div.className = 'tobuy__feedback feedback active' }
				else { div.className = 'tobuy__feedback feedback active even' }

				div.innerHTML = `
				<div class="feedback__avatar">
								<img src=${push.avatar} alt="Покупатель" width="48">
							</div>
							<div class="feedback__message-wrapper">
								<div class="feedback__message">
									<p>${push.message}</p>
								</div>
								<span class="feedback__date">${time}AM</span>
							</div>
				`

				containerPush.appendChild(div)
			})
		}
	} catch (error) {
		console.error('Error: ', error)
	}
}

fettchPush()