<template>
	<div class="flex flex-wrap gap-4 items-center z-20">
		<Btn v-for="item in list" class="col-span-2 !relative bg-dark/70 !w-full" :to="`/salony/${item.url}`">
			<img :src="item.img?.bg" :alt="item.img?.alt" v-if="item.img?.bg" class="max-h-40 w-full" />
			<div
				class="absolute inset-0 flex justify-center items-center text-2xl md:text-3xl px-5 py-4 whitespace-nowrap"
				v-text="item.title"
			/>
		</Btn>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useSalony } from '@/store/salony.js'
const { getSalony } = useSalony()
const { salony } = storeToRefs(useSalony())
watchEffect(() => getSalony())

defineProps({
	list: Array,
})
</script>
