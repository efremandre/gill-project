import { disabledBtnForm } from './modules/_disabledBtnForm.js'
import { sendForm } from './modules/_form.js'
import { hello } from './modules/_hello.js'
import { initSlider } from './modules/_initSlider.js'
import { modal } from './modules/_modal.js'
import { pressUp } from './modules/_pressUp.js'
import { purchaseNotice } from './modules/_purchaseNotice.js'
import { setCurrent } from './modules/_setCurrent.js'
import { initialState } from './modules/_state.js'
import { timer } from './modules/_timer.js'
import { toggleVersion } from './modules/_toggleVersion.js'

hello()
toggleVersion()
initialState()
timer()
purchaseNotice()
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