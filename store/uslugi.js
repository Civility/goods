import { defineStore } from 'pinia'
// const isDev = process.env.NODE_ENV !== 'production'
// const isAPI = process.env.PUBLIC_NAME + '/api/'
export const useUslugi = defineStore('uslugi', {
	state: () => ({
		USLUGI: [],
		USLUGIURL: null,
	}),
	getters: {
		uslugi: (s) => s.USLUGI,
		uslugiURL: (s) => s.USLUGIURL,
	},
	actions: {
		async getUslugi(PUBLIC_NAME) {
			if (!this.USLUGI.length) {
				try {
					this.USLUGI = await $fetch(`${PUBLIC_NAME}/api/uslugi`)
				} catch (err) {
					console.log(err)
					await navigateTo(`/`)
					throw createError()
				}
			}
		},
		async getUslugiURL(PUBLIC_NAME, url) {
			try {
				this.USLUGIURL = await $fetch(`${PUBLIC_NAME}/api/uslugi/${url}`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
			}
		},
	},
})
