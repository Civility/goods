<template>
	<footer class="footer box-decoration-slice bg-gradient-to-b from-sec-darker to-some-dark py-8 mt-auto">
		<div class="container wrap">
			<span class="md:col-span-3 col-span-full flex flex-col gap-4">
				<Btn sec :to="`tel:${phone1}`" class="gap-2 !w-full mb-4">
					<Icon svg="call" class="border-white" />

					Телефон</Btn
				>
				<div class="flex flex-wrap md:flex-nowrap gap-4">
					<dl v-for="(point, index) in contact" :key="index">
						<dt class="text-2xl mb-1">Адрес: {{ index + 1 }}</dt>
						<dd class="text-xl py-3 rounded-lg flex items-center gap-2">
							<Icon svg="call" class="border-white" />
							{{ point.address.city }}
							<br />
							{{ point.address.street }}
						</dd>
					</dl>
				</div>
			</span>
			<span class="md:col-span-3 col-span-full gap-4 flex flex-col">
				<div class="w-full">
					<Btn sec class="gap-2 !w-full mb-3" @click="openModal('map')">
						<Icon svg="logo" class="border-white" />
						Карта
					</Btn>
					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<!-- <template #header>header</template> -->
						<template #body> <img src="/assets/img/map1.webp" alt="map" /> </template>
						<!-- <template #footer>footer</template> -->
					</Modal>
				</div>
				<div class="flex gap-4 mt-auto">
					<template v-for="soc in SOCIALS" :key="soc.title">
						<Btn sec class="gap-2 !px-4 !w-full" :to="soc.url">
							<Icon :svg="soc.icon" class="border-white" />
							{{ soc.title }}
						</Btn>
					</template>
				</div>
			</span>
			<div class="col-span-full flex gap-4 mt-auto text-xs text-white/70">
				<span class="max-w-max">{{ COPYRIGHT.low }}</span>
				<span class="max-w-max">{{ COPYRIGHT.inn }}</span>
			</div>
		</div>
	</footer>
</template>
<script setup>
// import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'
const { contact } = storeToRefs(useMain())
const { COPYRIGHT, SOCIALS, phone1 } = useMain()

const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
