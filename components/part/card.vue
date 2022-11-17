<template>
	<div
		class="relative rounded overflow-hidden bg-sec shadow-mainLight group text-center transition-all hover:shadow-neon"
		:class="{ 'h-[26rem]': !data.img.mini }"
	>
		<img class="h-[26rem] mx-auto" :src="`${config.public.G_IMG}${data?.img?.mini}`" :alt="data.name" v-if="data.img.mini" />
		<span v-else class="h-[26rem] mx-auto" />
		<NuxtLink :to="data?.url" class="absolute inset-0 w-full h-full flex flex-col group !no-underline">
			<div
				class="mt-auto lg:opacity-0 lg:group-hover:opacity-100 transition-all flex shadow text-xl flex-col bg-gradient-to-r from-sec/90 to-main/70 divide-y divide-main/70 lg:group-hover:to-main/70 lg:group-hover:from-sec/90 group-hover:shadow-neon"
			>
				<span class="py-2" v-text="data?.name" />
				<div class="flex gap-4">
					<span class="self-center"><Svg svg="ic:baseline-currency-ruble" class="border-main-lighter" /></span>
					<dl class="w-full flex flex-wrap">
						<dd class="w-24 text-left">в салоне</dd>
						<dt>{{ data.price?.min }}</dt>
						<br />
						<dd class="w-24 text-left">с выездом</dd>
						<dt>{{ data.price?.max }}</dt>
					</dl>
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
