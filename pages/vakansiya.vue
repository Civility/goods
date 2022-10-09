<template>
	<main class="vacancy flex md:flex-row flex-col container !pr-0">
		<section class="md:py-10 py-8 mr-4 w-full">
			<NuxtPage v-show="!vacancyWait" />
		</section>
		<Sidemenu :data="isAsideList" />
	</main>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const { getVacancy } = useVacancy()
const { vacancy } = storeToRefs(useVacancy())
const { pending: vacancyWait, data: vacancyData } = await useLazyAsyncData('vacancy', () => getVacancy())
const isAsideList = computed(() => vacancy.value.map(({ url, title }) => ({ url, title })))
</script>
