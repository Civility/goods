<template>
	<main class="uslugi flex md:flex-row flex-col container !pr-0">
		<NuxtPage :data="isAsideList" />
		<Sidemenu :data="isAsideList" link="uslugi" />
	</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUslugi } from '@/store/uslugi.js'
const { getUslugi } = useUslugi()
const { uslugi } = storeToRefs(useUslugi())

const { pending: uslugiWait, data: uslugiData } = await useLazyAsyncData('uslugi', () => getUslugi())
const isAsideList = computed(() => uslugi.value.map(({ url, title, img_bg }) => ({ url, title, img_bg })))
</script>
