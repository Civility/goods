import { defineStore } from 'pinia'
// const isDev = process.env.NODE_ENV !== 'production'
// const isAPI = process.env.PUBLIC_NAME + '/api/'
export const useVacancy = defineStore('vacancy', {
	state: () => ({
		VACANCY: [],

		VACANCYURL: null,
	}),
	getters: {
		vacancy: (s) => s.VACANCY,
		vacancyURL: (s) => s.VACANCYURL[0],
	},
	actions: {
		async getVacancy(PUBLIC_NAME) {
			if (!this.VACANCY.length) {
				try {
					this.VACANCY = await $fetch(`${PUBLIC_NAME}/api/vacancy`)
				} catch (err) {
					console.log(err)
					await navigateTo(`/`)
				}
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
