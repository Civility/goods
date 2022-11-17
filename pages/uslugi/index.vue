<template>
	<div class="wrap w-full gap-4 items-center mr-4 z-10 md:py-10 py-8">
		<Btn sec v-for="item in data" class="col-span-full !relative bg-dark/70 !w-full" :to="`/uslugi/${item.url}`">
			<img :src="`${config.public.G_IMG}${item.img_bg}`" :alt="item?.url" v-if="item.img_bg" class="max-h-40 w-full" />
			<div
				class="absolute inset-0 flex justify-center items-center text-2xl md:text-3xl px-5 py-4 whitespace-nowrap bg-dark/30 font-bold text-shadow"
				v-text="item.title"
			/>
		</Btn>
	</div>
</template>
<script setup>
import { useUslugi } from '@/store/uslugi.js'
const config = useRuntimeConfig()
const { getUslugi } = useUslugi()

watchEffect(() => getUslugi(config.public.PUBLIC_NAME))
defineProps({
	data: Array,
})
</script>
