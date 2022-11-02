<template>
	<div class="wrap w-full gap-4 items-center mr-4 z-10 md:py-10 py-8">
		<Btn v-for="item in data" class="col-span-full !relative bg-dark/70 !w-full" :to="`/salony/${item.url}`">
			<img :src="`${config.public.G_IMG}${item.img_bg}`" :alt="item?.url" v-if="item.img_bg" class="max-h-40 w-full" />
			<div
				class="absolute inset-0 flex justify-center items-center text-2xl md:text-3xl px-5 py-4 whitespace-nowrap"
				v-text="item.title"
			/>
		</Btn>
	</div>
</template>
<script setup>
import { useSalony } from '@/store/salony.js'
const config = useRuntimeConfig()
const { getSalony } = useSalony()

watchEffect(() => getSalony(config.public.PUBLIC_NAME))
defineProps({
	data: Array,
})
</script>
