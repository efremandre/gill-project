'use strict'

export function timer() {
	const deadline = new Date(2024, 0, 26)
	let timerId = null

	function declensionNum(num, words) {
		return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]]
	}

	function formatNumber(num) {
		return num < 10 ? '0' + num : num
	}

	function updateTimerElements(days, hours, minutes, seconds) {
		$days.textContent = formatNumber(days)
		$hours.textContent = formatNumber(hours)
		$minutes.textContent = formatNumber(minutes)
		$seconds.textContent = formatNumber(seconds)

		$days.dataset.title = declensionNum(days, ['день', 'дня', 'дней'])
		$hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов'])
		$minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут'])
		$seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд'])
	}

	function countdownTimer() {
		const diff = deadline - new Date()

		if (diff <= 0) {
			clearInterval(timerId)
			return
		}

		const days = Math.floor(diff / 1000 / 60 / 60 / 24)
		const hours = Math.floor(diff / 1000 / 60 / 60) % 24
		const minutes = Math.floor(diff / 1000 / 60) % 60
		const seconds = Math.floor(diff / 1000) % 60

		updateTimerElements(days, hours, minutes, seconds)
	}

	const $days = document.querySelector('.timer__days')
	const $hours = document.querySelector('.timer__hours')
	const $minutes = document.querySelector('.timer__minutes')
	const $seconds = document.querySelector('.timer__seconds')

	countdownTimer()
	timerId = setInterval(countdownTimer, 1000)
}