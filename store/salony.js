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
		salonyURL: (s) => s.SALONYURL,
	},
	actions: {
		async getSalony(PUBLIC_NAME) {
			if (!this.SALONY.length) {
				try {
					this.SALONY = await $fetch(`${PUBLIC_NAME}/api/salony`)
				} catch (err) {
					console.log(err)
					await navigateTo(`/`)
					throw createError()
				}
			}
		},
		async getSalonyURL(PUBLIC_NAME, url) {
			try {
				this.SALONYURL = await $fetch(`${PUBLIC_NAME}/api/salony/${url}`)
			} catch (err) {
				console.log(err)
				await navigateTo(`/`)
				throw createError()
			}
		},
	},
})
