<template>
	<div class="relative rounded overflow-hidden bg-sec shadow-mainLight group text-center transition-all hover:shadow-neon">
		<img class="h-[26rem] mx-auto" :src="`${config.public.G_IMG}${data?.img?.mini}`" :alt="data.name" />
		<NuxtLink :to="data?.url" class="absolute inset-0 w-full h-full flex flex-col group">
			<div
				class="mt-auto lg:opacity-0 lg:group-hover:opacity-100 transition-all flex shadow text-xl flex-col bg-gradient-to-r from-sec/90 to-main/70 divide-y divide-main/70 lg:group-hover:to-main/70 lg:group-hover:from-sec/90 group-hover:shadow-neon"
			>
				<span class="py-2" v-text="data?.name" />
				<div class="flex py-2 gap-2 justify-center items-center">
					<Svg svg="ic:baseline-currency-ruble" class="border-main-lighter" />
					<span class="text-left">Min {{ data.price?.min }}<br />Max {{ data.price?.max }}</span>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<script setup>
const config = useRuntimeConfig()
defineProps({
	data: Object,
})
</script>
