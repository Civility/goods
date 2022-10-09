<template>
	<div class="relative rounded overflow-hidden bg-sec shadow-mainLight group text-center transition-all hover:shadow-neon">
		<img class="h-[26rem] mx-auto" :src="data.img.mini" :alt="data.name" />
		<NuxtLink :to="data.url" class="absolute inset-0 w-full h-full flex flex-col group">
			<div
				class="mt-auto opacity-0 group-hover:opacity-100 transition-all flex shadow text-xl flex-col bg-gradient-to-r from-some/70 to-sec/90 divide-y divide-main/70 group-hover:to-main/70 group-hover:from-sec/90 group-hover:shadow-neon"
			>
				<span class="py-2"> {{ data.name }} - {{ data.value.age }} </span>
				<div class="flex py-2 gap-2 justify-center items-center">
					<Icon svg="rub" class="border-main-lighter" />
					<span>{{ data.price.min }}</span>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<script setup>
defineProps({
	data: Object,
})
</script>
