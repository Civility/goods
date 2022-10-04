export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.$router.options.scrollBehavior = async (to, from, savedPosition) => {
		if (savedPosition) {
			return await savedPosition
		} else {
			return await { left: 0, top: 0, behaviour: 'smooth' }
		}
	}
})
