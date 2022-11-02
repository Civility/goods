<template>
	<main class="uslugi flex md:flex-row flex-col container !pr-0" v-if="!uslugiWait">
		<NuxtPage :data="uslugi" />
		<Sidemenu :data="uslugi" link="uslugi" />
	</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUslugi } from '@/store/uslugi.js'
const config = useRuntimeConfig()
const { getUslugi } = useUslugi()
const { uslugi } = storeToRefs(useUslugi())

const { pending: uslugiWait, data: uslugiData, error } = await useLazyAsyncData('uslugi', () => getUslugi(config.public.PUBLIC_NAME))
// const isAsideList = computed(() => uslugi.value.map(({ url, title, img_bg }) => ({ url, title, img_bg })))
if (error.value) {
	await navigateTo(`/`)
	throw createError()
}
</script>
