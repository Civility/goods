import { defineStore } from 'pinia'
import { useSalony } from './salony'
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
		ASIDEMENU: false,
		MODALOPEN: false,
		MODALCLOSE: true,
		MODALTOGGLE: false,
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

		NOWDATE: new Date().getFullYear(),
		GOODSLENGTH: null,
		GOODS: [],
		STAFF: {},
		SALONS: [],
	}),
	getters: {
		salons(s) {
			return (s.SALONS = useSalony().salony.map(({ address, phone }) => ({ address, phone, number: replaceNumber(phone) })))
		},
		asideMenu: (s) => s.ASIDEMENU,

		contact(s) {
			return (s.CONTACT = this.salons)
		},
		toggleMenu: (s) => s.TOGGLEMENU,
		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE,
		goodsLength: (s) => s.GOODSLENGTH,
		goods: (s) => s.GOODS,
		staff: (s) => s.STAFF,
	},
	actions: {
		getAsideMenu() {
			this.ASIDEMENU = !this.ASIDEMENU
		},
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
