<template>
	<aside
		class="aside-menu z-20 flex flex-col gap-y-4 from-some-dark/70 to-sec-darker/90 shadow-lg md:py-10 py-8"
		:class="{ 'bg-gradient-to-b  md:min-w-[15rem] md:w-60 ': asideMenu }"
	>
		<i class="p-4 cursor-pointer self-end bg-some-dark/80 rounded-lg h-max sticky top-[20%]" @click="getAsideMenu()">
			<button class="nav__menu glue group" :class="{ 'nav__menu--active': asideMenu }">
				<span :class="'nav__menu-icon'" v-for="i in 3" />
			</button>
		</i>
		<div class="flex flex-col gap-y-4 px-4 h-full" v-show="asideMenu">
			<div class="flex flex-col gap-y-4">
				<Btn sec v-for="item in data" :to="`/${link}/${item.url}`" class="!w-auto">{{ item.title }}</Btn>
			</div>

			<!-- <div class="flex flex-col gap-y-4 mt-auto">
				<Btn class="gap-2 !w-auto" :to="`//t.me/${phone1}`">
					<Icon svg="telegram" class="border-main-lighter" />
				</Btn>
				<Btn class="z-10 gap-2 !w-auto" :to="`//wa.me/${phone2}`">
					<Icon svg="whatsapp" class="border-main-lighter" />
				</Btn>
			</div> -->
		</div>
	</aside>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'

const { getAsideMenu } = mapActions(useMain, ['getAsideMenu'])
const { asideMenu, contact } = storeToRefs(useMain())

defineProps({
	data: Array,
	link: String,
})
</script>
