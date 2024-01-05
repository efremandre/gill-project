'use strict'

export function purchaseNotice() {

	// Функция для получения текущего времени в формате "часы:минуты"
	function getCurrentTime() {
		const now = new Date()
		const hours = now.getHours()
		const minutes = now.getMinutes()
		return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
	}

	// Массив для хранения отзывов
	const arr = []
	// Контейнер, куда будут добавляться отзывы
	const containerPush = document.querySelector('.tobuy__feedbacks')

	// Функция для получения данных из файла и добавления отзывов на страницу
	const fetchData = async () => {
		try {
			// Запрос на получение данных
			const response = await fetch('../files/data.json')
			// Преобразование ответа в формат JSON
			const data = await response.json()

			// Создание отзывов и добавление их на страницу
			data.forEach((push, index) => {
				const time = getCurrentTime()
				const div = document.createElement('div')
				div.className = 'tobuy__feedback feedback'

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

				arr.push(div)
			})

			// Отображение начальных отзывов
			displayInitialFeedbacks()
		} catch (error) {
			console.log('Error:', error.message)
		}
	}

	// Функция для отображения первоначальных отзывов
	function displayInitialFeedbacks() {
		for (let index = 0; index < 3; index++) {
			const push = arr[index]
			push.classList.add('active')

			// Каждый второй отзыв помечается как "even"
			if (index === 1) {
				push.classList.add('even')
			}
			containerPush.appendChild(push)
		}

		// Запуск интервала добавления отзывов
		startPushElementInterval()
	}

	// Функция для получения высоты элемента с учетом margin
	function getHeightElement(element) {
		const styles = window.getComputedStyle(element)
		const marginBottom = parseInt(styles.marginBottom)
		const height = element.offsetHeight
		return height + marginBottom
	}

	// Функция для получения случайного индекса, исключая предыдущие индексы
	function getRandomIndex(arr, prevIndex) {
		let randomIndex
		do {
			randomIndex = Math.floor(Math.random() * arr.length)
		} while (prevIndex.includes(randomIndex))
		return randomIndex
	}

	// Функция для добавления отзывов с интервалом
	async function pushElementInterval() {
		const containerPush = document.querySelector('.tobuy__feedbacks')

		// Проверка на количество отзывов в контейнере
		if (containerPush.children.length >= 12) {
			containerPush.classList.remove('_transition')

			// Удаление последних отзывов и их индексов
			for (let i = 0; i <= 8; i++) {
				containerPush.removeChild(containerPush.lastChild)
				prevIndex.pop()
			}

			index = 3
			temp = 0

			// Восстановление анимации
			setTimeout(() => {
				containerPush.classList.add('_transition')
			}, 50)
		}

		// Получение случайного индекса и клонирование отзыва
		const randomIndex = getRandomIndex(arr, prevIndex)
		const push = arr[randomIndex].cloneNode(true)

		// Небольшая пауза для асинхронности
		await new Promise(resolve => setTimeout(resolve, 0))

		// Добавление отзыва в контейнер
		containerPush.appendChild(push)

		// Переключение между "active" и "even" классами
		isEven = !isEven
		isEven ? push.classList.add('active', 'even') : push.classList.add('active')

		// Вычисление и обновление высоты контейнера
		const height = getHeightElement(push)
		temp += height
		containerPush.style.transform = `translateY(-${temp}px)`

		index++

		// Добавление индекса в массив предыдущих индексов
		prevIndex.push(randomIndex)

		// Удаление первого индекса из массива, если его длина превысила 4
		if (prevIndex.length > 4) {
			prevIndex.shift()
		}

		// Задержка перед следующим вызовом функции
		const delay = index === 3 ? 5000 : 5000
		setTimeout(() => pushElementInterval(), delay)
	}

	// Инициализация переменных и запуск интервала
	let index = 3
	let prevIndex = []
	let temp = 0
	let isEven = false

	// Функция для запуска интервала
	function startPushElementInterval() {
		pushElementInterval()
	}

	// Загрузка данных и запуск всего процесса
	fetchData()

}