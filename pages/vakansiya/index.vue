<template>
	<div class="flex flex-wrap gap-4 items-center z-30">
		<Btn v-for="item in isAsideList" class="col-span-2" :to="item.url">
			<div class="text-2xl md:text-3xl px-5 py-4 whitespace-nowrap" v-text="item.title" />
		</Btn>
	</div>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const { getVacancy } = useVacancy()
const { vacancy } = storeToRefs(useVacancy())
watchEffect(() => getVacancy())

const isAsideList = computed(() => vacancy.value.map(({ url, title }) => ({ url, title })))
</script>
