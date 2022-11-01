import { defineStore } from 'pinia'
// const isDev = process.env.NODE_ENV !== 'production'

// const isAPI = process.env.PUBLIC_NAME + '/api/'
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
					this.SALONY = await $fetch(`${process.env.PUBLIC_NAME}/api/salony`, {
						headers: {
							'Access-Control-Allow-Origin': '*',
						},
					})
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
