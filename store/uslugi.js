import { defineStore } from 'pinia'
const localAPI = 'http://localhost:3000/'
export const useUslugi = defineStore('uslugi', {
	state: () => ({
		USLUGI: [],
		USLUGIURL: [],
	}),
	getters: {
		uslugi: (s) => s.USLUGI,
		uslugiURL: (s) => s.USLUGIURL[0],
	},
	actions: {
		async getUslugi() {
			try {
				this.USLUGI = await $fetch(`${localAPI}local/uslugi.json`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
		async getUslugiURL() {
			try {
				this.USLUGIURL = this.USLUGI.filter((item) => item.url === useRoute().params.url)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
