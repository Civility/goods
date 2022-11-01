import { defineStore } from 'pinia'
// const isDev = process.env.NODE_ENV !== 'production'
// const isAPI = process.env.PUBLIC_NAME + '/api/'
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
				this.VACANCY = await $fetch(`${process.env.PUBLIC_NAME}/api/vacancy`, {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				})
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
