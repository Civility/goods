<template>
	<main class="salony relative flex md:flex-row flex-col-reverse md:!pr-0">
		<NuxtPage :data="salony" class="container" />
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
