<template>
	<header class="header" :class="{ 'header--active h-screen !fixed': toggleMenu }">
		<div class="container flex flex-wrap justify-between items-center md:gap-8 gap-4">
			<NuxtLink to="/" @click="useMain().getMenuClosed" class="md:order-none order-1 z-10" exact>
				<img src="~/assets/svg/logo.svg" height="48" width="48" alt="logo" />
			</NuxtLink>
			<div class="header__address flex gap-4 flex-wrap md:w-auto w-full justify-center md:order-none order-3">
				<Btn clean v-for="item in contact" :to="`tel:${item.number}`" class="!grid grid-cols-[40px,_1fr]">
					<Svg svg="ic:baseline-call" class="border-white row-span-2" />
					<div class="text-sec-lighter" v-text="item.phone" />
					<span class="text-main-lighter" v-text="item.address.city" />
				</Btn>
			</div>
			<div class="flex gap-x-6">
				<Btn clean to="https://telegram.me/+79215542968">
					<Svg svg="logos:telegram" class="border-white shadow-neon row-span-2" />
				</Btn>
				<Btn clean to="https://wa.me/+79215542968">
					<Svg svg="logos:whatsapp-icon" class="border-white shadow-neon row-span-2" />
				</Btn>
			</div>

			<nav class="nav md:order-none order-2 h-full">
				<menu v-show="toggleMenu" class="absolute inset-0 flex justify-center items-center">
					<div class="w-full flex flex-col gap-4 justify-center items-center relative">
						<Btn to="/vakansiya" class="!text-2xl !py-4 !w-full md:!w-1/2" @click="useMain().getMenuClosed">Вакансии</Btn>
						<Btn to="/salony" class="!text-2xl !py-4 !w-full md:!w-1/2" @click="useMain().getMenuClosed">Салоны</Btn>
						<Btn to="/uslugi" class="!text-2xl !py-4 !w-full md:!w-1/2" @click="useMain().getMenuClosed">Услуги</Btn>
					</div>
				</menu>
				<div class="cursor-pointer w-16 h-16 flex justify-end items-center relative" @click="useMain().getMenuToggle">
					<button class="nav__menu glue group" :class="{ 'nav__menu--active': toggleMenu }">
						<span :class="'nav__menu-icon'" v-for="i in 3" />
					</button>
				</div>
			</nav>
		</div>
	</header>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'
import { useSalony } from '@/store/salony.js'
const config = useRuntimeConfig()
const { getSalony } = useSalony()
// const { SOCIALS } = useMain()
const { pending: salonyWait, data: salonyData } = await useLazyAsyncData('salony', () => getSalony(config.public.PUBLIC_NAME))
const { getContactData } = mapActions(useMain, ['getContactData'])
const { contact, salons, getMenuToggle, toggleMenu, getMenuClosed } = storeToRefs(useMain())
</script>
<style scoped lang="postcss">
.header {
	@apply sticky top-0 z-30 w-full;
	@apply py-2;
	@apply border-b border-main-dark;
	@apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-some-dark/50 before:to-some/70;
	&--active {
		@apply before:from-some-dark  before:to-some;
	}
}
</style>
