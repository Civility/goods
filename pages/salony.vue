<template>
	<main class="salony flex md:flex-row flex-col container !pr-0" v-if="!salonyWait">
		<NuxtPage :data="salony" />
		<Sidemenu :data="salony" link="salony" />
	</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useSalony } from '@/store/salony.js'
const config = useRuntimeConfig()
const { getSalony } = useSalony()
const { salony } = storeToRefs(useSalony())

const { pending: salonyWait, data: salonyData, error } = await useLazyAsyncData('salony', () => getSalony(config.public.PUBLIC_NAME))
// const isAsideList = computed(() => salony.value.map(({ url, title, img_bg }) => ({ url, title, img_bg })))
if (error.value) {
	await navigateTo(`/`)
	throw createError()
}
</script>
