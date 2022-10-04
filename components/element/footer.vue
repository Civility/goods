<template>
	<footer class="footer box-decoration-slice bg-gradient-to-b from-sec-darker to-some-dark py-8">
		<div class="container wrap">
			<span class="md:col-span-3 col-span-full flex flex-col gap-4">
				<Button sec :link="`tel:${PHONE3}`" class="gap-2 !w-full mb-4">
					<i class="border border-white rounded-full w-10 h-10 flex items-center justify-center">
						<img src="/assets/svg/call.svg" width="24" height="24" alt="phone"
					/></i>
					Телефон</Button
				>
				<div class="flex flex-wrap md:flex-nowrap gap-4">
					<dl v-for="(point, index) in address" :key="index">
						<dt class="text-2xl mb-1">Адрес: {{ index + 1 }}</dt>
						<dd class="text-xl py-3 rounded-lg flex items-center gap-2">
							<i class="border border-white rounded-full w-10 h-10 flex items-center justify-center"
								><img src="/assets/svg/call.svg" width="24" height="24" alt="phone" /></i
							>{{ point }}
						</dd>
					</dl>
				</div>
			</span>
			<span class="md:col-span-3 col-span-full gap-4 flex flex-col">
				<div class="w-full">
					<Button sec class="gap-2 !w-full mb-3" @click="openModal('map')">
						<i class="border border-white rounded-full w-10 h-10 flex items-center justify-center">
							<img src="/assets/svg/logo.svg" width="24" height="24" alt="map"
						/></i>
						Карта</Button
					>
					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<!-- <template #header>header</template> -->
						<template #body> <img src="/assets/img/map1.webp" alt="map" /> </template>
						<!-- <template #footer>footer</template> -->
					</Modal>
				</div>
				<div class="flex gap-4 mt-auto">
					<template v-for="soc in socials" :key="soc.title">
						<Button sec class="gap-2 !px-4 !w-full" :link="soc.url">
							<i class="border border-white rounded-full w-10 h-10 flex items-center justify-center">
								<img :src="`/assets/svg/${soc.icon}`" width="24" height="24" :alt="soc.title"
							/></i>
							{{ soc.title }}</Button
						>
					</template>
				</div>
			</span>
			<div class="col-span-full flex gap-4 mt-auto text-xs">
				<span class="max-w-max">{{ copyright.low }}</span>
				<span class="max-w-max">{{ copyright.inn }}</span>
			</div>
		</div>
	</footer>
</template>
<script setup>
// import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'

const { copyright, socials, address, phone3, PHONE3 } = useMainStore()

const { MODALTOGGLE } = storeToRefs(useMainStore())
const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
