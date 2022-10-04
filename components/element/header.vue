<template>
	<header class="header">
		<div class="container flex sm:flex-row flex-col sm:justify-between sm:items-center md:gap-8 gap-4">
			<nav class="nav flex flex-wrap justify-center gap-4">
				<NuxtLink to="/">
					<img src="/assets/svg/logo.svg" height="48" width="48" alt="logo" />
				</NuxtLink>

				<!-- <button @click="istoggleMenu = !istoggleMenu" class="nav__menu" :class="{ 'nav__menu--active': istoggleMenu }">
					<span :class="'nav__menu-icon'" v-for="i in 3" />
				</button> -->
			</nav>

			<span class="text-neon font-neon xxl:text-xxl md:text-lg text-center"> Круглосуточно 24/7 </span>
		</div>
	</header>
</template>
<script setup>
import { useMainStore } from '@/store/main.js'
const { PHONE2, PHONE1 } = useMainStore()
</script>
<style scoped lang="postcss">
.header {
	@apply sticky top-0 z-30 w-full;
	@apply py-2;
	@apply border-b border-main-dark;
	@apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-some-dark/50 before:to-some/70;
}
.nav__menu--active {
	& .nav__menu-icon {
		&:first-child {
			@apply top-3 rotate-45;
		}
		&:nth-child(2) {
			@apply hidden;
		}
		&:last-child {
			@apply top-3 bottom-auto -rotate-45;
		}
	}
}
</style>
