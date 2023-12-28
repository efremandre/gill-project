'use strict'

export function initialState() {
	if (!localStorage.length) localStorage.setItem('version', 'man')
	if (!localStorage.getItem('quantity')) localStorage.setItem('quantity', 3)
	if (!localStorage.getItem('price')) localStorage.setItem('price', 2999)
}