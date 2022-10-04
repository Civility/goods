import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const replaceNumber = (number) => {
	return number.replace(/[^0-9]/g, '')
}
export const useMainStore = defineStore('main', {
	state: () => ({
		toggleMenu: false,
		modalOpen: false,
		modalClose: true,
		modalToggle: false,
		phone1: '+7 (812) 333-33-41',
		phone2: '+7 (812) 333-33-42',
		phone3: '+7 (812) 333-33-43',
		socials: [
			{ title: 'telegram', url: '#', icon: 'telegram.svg' },
			{ title: 'whatsapp', url: '#', icon: 'whatsapp.svg' },
		],
		docs: [{ title: 'Пользовательское соглашение', url: '#' }],
		copyright: {
			low: '© Все права зарегистрированы.',
			inn: 'ООО "goods Финанс"',
		},
		address: ['м.Комендантский пр.', 'м.Пионерская'],
		nowDate: new Date().getFullYear(),
		goodslength: null,
		goods: [],
		staff: {},
	}),
	getters: {
		PHONE1: (s) => replaceNumber(s.phone1),
		PHONE2: (s) => replaceNumber(s.phone2),
		PHONE3: (s) => replaceNumber(s.phone3),
		TOGGLEMENU: (s) => s.toggleMenu,
		MODALOPEN: (s) => (s.modalOpen = true),
		MODALCLOSE: (s) => (s.modalClose = false),
		MODALTOGGLE: (s) => s.modalToggle,
		GOODSLENGTH: (s) => s.goodslength,
		GOODS: (s) => s.goods,
		STAFF: (s) => s.staff,
	},
	actions: {
		getMenuToggle() {
			this.toggleMenu = !this.toggleMenu
		},
		getMenuClosed() {
			this.toggleMenu = false
		},
		getModalToggle(val) {
			this.modalToggle = val
		},
		async getGoods() {
			if (!this.GOODS.length) {
				try {
					const API = await $fetch(`${localAPI}local/goods.json`)
					this.goodslength = API.length
					return (this.goods = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getStaff(url) {
			try {
				this.staff = await $fetch(`${localAPI}local/${url}.json`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
