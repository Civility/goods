import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
export const useVacancy = defineStore('vacancy', {
	state: () => ({
		VACANCY: [],

		VACANCYURL: [],
	}),
	getters: {
		vacancy: (s) => s.VACANCY,
		vacancyURL: (s) => s.VACANCYURL[0],
	},
	actions: {
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
