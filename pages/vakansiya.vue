<template>
	<main class="vacancy flex md:flex-row flex-col container !pr-0">
		<NuxtPage v-show="!vacancyWait" :data="isAsideList" />
		<Sidemenu :data="isAsideList" link="vakansiya" />
	</main>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const { getVacancy } = useVacancy()
const { vacancy } = storeToRefs(useVacancy())
const { pending: vacancyWait, data: vacancyData } = await useLazyAsyncData('vacancy', () => getVacancy())
const isAsideList = computed(() => vacancy.value.map(({ url, title, img }) => ({ url, title, img })))
</script>
