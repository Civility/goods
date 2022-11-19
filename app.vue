<template>
	<div v-if="localverification === false">
		<Header />
		<NuxtPage />
		<LazyFooter />
	</div>
	<div v-else class="fixed z-30 inset-0 overflow-y-auto bg-gradient-to-t from-sec to-main">
		<div class="flex items-center justify-center pt-24 text-center">
			<div
				class="lg:w-1/2 w-full mx-4 bg-white rounded-lg overflow-hidden p-4 shadow-neon text-center py-10 flex flex-col justify-center items-center"
			>
				<h3 class="text-sec mb-2">
					Сайт может содержать контент для взрослых
				</h3>
				<h3 class="text-main font-bold flex justify-center items-center">
					<Svg svg="mdi:alert-octagram" class="text-main mx-4 text-2xl" />Вам уже исполнилось 18лет?
				</h3>
				<Btn sec @click.native.stop="isHelp(false)" class="!py-4 my-4 !w-1/2 text-2xl"> Да</Btn>
				<Btn sec @click.native.stop="isHelp(true)" class="!py-4 !w-1/2 text-2xl"> Нет</Btn>
			</div>
		</div>
	</div>
</template>
<script setup>
const localverification = shallowRef(true)

const isHelp = (val) => {
	if (process.client) {
		localStorage.setItem('verification', val)
		localverification.value = val
		// verification.value = val
	}
}
onMounted(() => {
	if (process.client) {
		localverification.value = localStorage.verification ?? localverification.value
	}
})
// const showModal = shallowRef(null)

// const isShow = (val) => (showModal.value = val)
// const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
