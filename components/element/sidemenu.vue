<template>
	<aside class="aside-menu md:ml-auto z-20 flex flex-col gap-y-4">
		<div
			class="md:sticky md:top-24 absolute top-0 right-0 md:py-10 py-4 h-full w-full md:rounded-none rounded-b-lg from-some-dark/70 to-sec-darker/90"
			:class="{ 'bg-gradient-to-b  md:min-w-[15rem] md:w-60 ': asideMenu }"
		>
			<i class="p-4 cursor-pointer flex justify-end rounded-lg h-max" @click="useMain().getAsideMenu">
				<button class="nav__menu glue group" :class="{ 'nav__menu--active': asideMenu }">
					<span class="nav__menu-icon !bg-white shadow-neon" v-for="i in 3" />
				</button>
			</i>
			<div class="px-4 h-full" v-show="asideMenu">
				<div class="flex flex-col gap-y-4">
					<Btn sec v-for="item in data" :to="`/${link}/${item.url}`" class="!w-auto">{{ item.title }} </Btn>
				</div>
			</div>
		</div>
	</aside>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'

// const { getAsideMenu } = mapActions(useMain, ['getAsideMenu'])
const { asideMenu, contact } = storeToRefs(useMain())

defineProps({
	data: Array,
	link: String,
})
</script>
