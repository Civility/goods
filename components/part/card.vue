<template>
	<div class="relative rounded overflow-hidden bg-sec shadow-neon group text-center transition-all">
		<img class="h-[26rem] mx-auto" :src="data.img.mini" :alt="data.name" />
		<div class="absolute inset-0 w-full h-full flex flex-col">
			<div>
				<div class="grid grid-cols-2 divide-x border-b lg:text-lg gap-3 p-2">
					<div><span class="capitalize">Name:</span> {{ data.name }}</div>
					<div><span class="capitalize">Age:</span> {{ data.value.age }}</div>
				</div>
				<div class="p-2 border-b lg:text-lg md:hidden group-hover:block">
					<span class="capitalize">Address:</span>{{ data.address }}
				</div>
			</div>

			<div class="mt-auto">
				<div class="flex md:hidden group-hover:flex border-t text-lg justify-center items-center gap-3 p-2">
					<i class="border border-main-lighter rounded-full w-10 h-10 flex items-center justify-center"
						><span class="px-2">$</span></i
					>
					<span>{{ data.price.min }}</span>
				</div>

				<Button
					class="!w-full !bg-transparent !rounded-none hover:!shadow-none hover:!bg-main-light border-t border-white"
					clip
					:link="data.url"
					>More</Button
				>
			</div>
		</div>
	</div>
</template>
<script setup>
defineProps({
	data: Object,
})
</script>
