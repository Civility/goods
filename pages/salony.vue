<template>
	<main class="salony flex md:flex-row flex-col container !pr-0">
		<NuxtPage v-show="!salonyWait" :list="isAsideList" />
		<Sidemenu :data="isAsideList" link="salony" />
	</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useSalony } from '@/store/salony.js'
const { getSalony } = useSalony()
const { salony } = storeToRefs(useSalony())
const { pending: salonyWait, data: salonyData } = await useLazyAsyncData('salony', () => getSalony())
const isAsideList = computed(() => salony.value.map(({ url, title, img }) => ({ url, title, img })))
</script>
