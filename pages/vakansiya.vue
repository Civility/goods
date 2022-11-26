<template>
	<main class="vacancy relative flex md:flex-row flex-col-reverse md:!pr-0">
		<NuxtPage :data="isAsideList" class="container" />
		<Sidemenu :data="isAsideList" link="vakansiya" />
		<Head>
			<Title>Вакансии</Title>
			<Meta name="keywords" :content="isAsideList.map((i) => i.title)" />
		</Head>
	</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const config = useRuntimeConfig()
const { getVacancy } = useVacancy()
const { vacancy } = storeToRefs(useVacancy())

const { pending: vacancyWait, data: vacancyData, error } = await useLazyAsyncData('vacancy', () => getVacancy(config.public.PUBLIC_NAME))
const isAsideList = computed(() => vacancy.value.map(({ url, title, img_bg }) => ({ url, title, img_bg })))
if (error.value) {
	await navigateTo(`/`)
	throw createError()
}
</script>
