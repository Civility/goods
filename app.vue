<template>
	<div v-if="!localverification">
		<Header />
		<NuxtPage :main="main" />
		<LazyFooter />
		<Head>
			<Meta name="keywords" :content="main.keywords" />
		</Head>
	</div>

	<div v-else class="fixed z-30 inset-0 overflow-y-auto bg-gradient-to-t from-sec to-main">
		<div class="flex items-center justify-center pt-24 text-center">
			<div
				class="
					lg:w-1/2
					w-full
					mx-4
					bg-white
					rounded-lg
					overflow-hidden
					p-4
					shadow-neon
					text-center
					py-10
					flex flex-col
					justify-center
					items-center
				"
			>
				<h3 class="text-sec mb-2">Сайт может содержать контент для взрослых</h3>
				<h3 class="text-main font-bold flex flex-wrap justify-center items-center gap-y-2">
					Вам уже исполнилось <br /><span class="inline-flex items-center"
						><Svg svg="mdi:alert-octagram" class="text-main mx-4 text-2xl" /> 18лет?</span
					>
				</h3>
				<Btn sec @click.native.stop="isHelp(false)" class="!py-4 my-4 !w-1/2 text-2xl"> Да</Btn>
				<Btn sec @click.native.stop="isHelp(true)" class="!py-4 !w-1/2 text-2xl"> Нет</Btn>
			</div>
		</div>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const config = useRuntimeConfig()
const { getMain } = useMain()
const { main } = storeToRefs(useMain())
const { pending: mainWait, data: mainData, error } = await useLazyAsyncData('main', () => getMain(config.public.PUBLIC_NAME))


const localverification = shallowRef(true)
const isHelp = (val) => {
	if (process.client) {
		localStorage.setItem('verification', val)
		localverification.value = val
	}
}
onMounted(() => {
	if (process.client) {
		localverification.value = localStorage.verification ?? localverification.value 
	}
})
</script>
