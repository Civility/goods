import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const replaceNumber = (number) => {
	return number.replace(/[^0-9]/g, '')
}
export const useVacancy = defineStore('vacancy', {
	state: () => ({
		VACANCY: [],
		ASIDEMENU: false,
		VACANCYURL: [],
	}),
	getters: {
		asideMenu: (s) => s.ASIDEMENU,
		vacancy: (s) => s.VACANCY,
		// vacancyURL: (s) => s.VACANCY.filter((item) => item.url === useRoute().params.url),
		vacancyURL: (s) => s.VACANCYURL[0],
	},
	actions: {
		getAsideMenu() {
			this.ASIDEMENU = !this.ASIDEMENU
		},

		async getVacancy() {
			try {
				this.VACANCY = await $fetch(`${localAPI}local/vacancy.json`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
		async getVacancyURL() {
			try {
				this.VACANCYURL = this.VACANCY.filter((item) => item.url === useRoute().params.url)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
