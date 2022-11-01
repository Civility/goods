import { defineStore } from 'pinia'
// const isDev = process.env.NODE_ENV !== 'production'
// const isAPI = process.env.PUBLIC_NAME + '/api/'
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
				this.USLUGI = await $fetch(`${process.env.PUBLIC_NAME}/api/uslugi`, {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				})
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
