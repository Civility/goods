import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
export const useSalony = defineStore('salony', {
	state: () => ({
		SALONY: [],
		SALONYURL: [],
	}),
	getters: {
		salony: (s) => s.SALONY,
		salonyURL: (s) => s.SALONYURL[0],
	},
	actions: {
		async getSalony() {
			if (!this.SALONY.length) {
				try {
					this.SALONY = await $fetch(`${localAPI}local/salony.json`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getSalonyURL() {
			try {
				this.SALONYURL = this.SALONY.filter((item) => item.url === useRoute().params.url)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
