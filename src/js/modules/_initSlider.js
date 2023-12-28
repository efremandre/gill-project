'use strict'
import Swiper, { Navigation, Autoplay, FreeMode } from 'swiper'
export function initSlider() {

	const swiper = new Swiper(".mySwiper", {
		modules: [Navigation, Autoplay, FreeMode],
		spaceBetween: 30,
		speed: 1000,
		autoplay: {
			delay: 10000,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			639: {
				slidesPerView: 2,
			},
			1100: {
				slidesPerView: 3,
			},
			1280: {
				slidesPerView: 2,
			}
		}
	})
}