<template>
	<div class="flex flex-wrap gap-4 items-center z-10 mr-4 md:py-10 py-8">
		<Btn v-for="item in data" class="col-span-2 !relative bg-dark/70 !w-full" :to="`/vakansiya/${item.url}`">
			<img :src="item.img?.bg" :alt="item.img?.alt" v-if="item.img?.bg" class="max-h-40 w-full" />
			<div
				class="absolute inset-0 flex justify-center items-center text-2xl md:text-3xl px-5 py-4 whitespace-nowrap"
				v-text="item.title"
			/>
		</Btn>
	</div>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const { getVacancy } = useVacancy()
const { vacancy } = storeToRefs(useVacancy())
watchEffect(() => getVacancy())
defineProps({
	data: Array,
})
</script>
