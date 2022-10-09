import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const replaceNumber = (number) => {
	return number.replace(/[^0-9]/g, '')
}
export const useMain = defineStore('main', {
	state: () => ({
		TOGGLEMENU: false,

		MODALOPEN: false,
		MODALCLOSE: true,
		MODALTOGGLE: false,
		PHONE1: '+7 (812) 333-33-41',
		PHONE2: '+7 (812) 333-33-42',
		SOCIALS: [
			{ title: 'telegram', url: '#', icon: 'telegram' },
			{ title: 'whatsapp', url: '#', icon: 'whatsapp' },
		],
		CONTACT: [],
		DOCS: [{ title: 'Пользовательское соглашение', url: '#' }],
		COPYRIGHT: {
			low: '© Все права зарегистрированы.',
			inn: 'ООО "goods Финанс"',
		},
		ADDRESS: ['м.Комендантский пр.', 'м.Пионерская'],
		NOWDATE: new Date().getFullYear(),
		GOODSLENGTH: null,
		GOODS: [],
		STAFF: {},
	}),
	getters: {
		phone1: (s) => replaceNumber(s.PHONE1),
		phone2: (s) => replaceNumber(s.PHONE2),
		contact: (s) =>
			(s.CONTACT = [
				{
					address: {
						city: 'Кингисепп',
						street: 'ул. Парижская, д. 1',
					},
					number: replaceNumber(s.PHONE1),
					phone: s.PHONE1,
				},
				{
					address: {
						city: 'Всеволожск',
						street: 'ул. Венгерская, д. 14',
					},
					number: replaceNumber(s.PHONE2),
					phone: s.PHONE2,
				},
			]),
		toggleMenu: (s) => s.TOGGLEMENU,

		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE,
		goodsLength: (s) => s.GOODSLENGTH,
		goods: (s) => s.GOODS,
		staff: (s) => s.STAFF,
	},
	actions: {
		async getContactData() {
			await this.contact
		},
		getMenuToggle() {
			this.TOGGLEMENU = !this.TOGGLEMENU
		},

		getMenuClosed() {
			this.TOGGLEMENU = false
		},
		getModalToggle(val) {
			this.MODALTOGGLE = val
		},
		async getGoods() {
			if (!this.GOODS.length) {
				try {
					const API = await $fetch(`${localAPI}local/goods.json`)
					this.GOODSLENGTH = API.length
					return (this.GOODS = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getStaff(url) {
			try {
				this.STAFF = await $fetch(`${localAPI}local/${url}.json`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
