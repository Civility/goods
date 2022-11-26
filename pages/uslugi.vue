<template>
	<main class="uslugi relative flex md:flex-row flex-col-reverse md:!pr-0">
		<NuxtPage :data="uslugi" class="container" />
		<Sidemenu :data="uslugi" link="uslugi" />
		<Head>
			<Title>Услуги</Title>
			<Meta name="keywords" :content="uslugi.map((i) => i.title)" />
		</Head>
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
