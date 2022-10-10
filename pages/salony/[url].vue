<template>
	<section class="md:py-10 py-8 mr-4 w-full wrap">
		<div class="salony__slider col-span-full">
			<Slider
				:data="salonyURL.slider"
				:spaceBetween="20"
				:slidesPerView="1"
				loop
				grabCursor
				:effect="'fade'"
				:fadeEffect="{ crossFade: true }"
				:autoplay="{
					delay: 3500,
					disableOnInteraction: true,
				}"
				:navigation="{
					prevEl: '#salonyPrev',
					nextEl: '#salonyNext',
				}"
				:pagination="{
					clickable: true,
				}"
			>
				<template #content="{ slider }">
					<!-- <img :src="`/img/slider/${slider}`" :alt="slider" class="block w-full h-full object-cover max-h-[470px]" /> -->
					<img :src="slider" :alt="slider" class="w-full h-full object-cover" />
					<nav class="absolute inset-0 w-full h-full flex justify-between">
						<Btn clean id="salonyPrev" class="salony__nav-prev"> &#129168;</Btn>
						<Btn clean id="salonyNext" class="salony__nav-next">&#129170;</Btn>
					</nav>
				</template>
			</Slider>
		</div>
		<div class="col-span-4 border border-main rounded-md p-4">
			<div v-html="salonyURL.text" />
			<div v-html="salonyURL.description" />
		</div>
		<div class="col-span-2 border border-main rounded-md p-4">
			<p>Цена1: <span v-text="salonyURL.price.min" /></p>

			<p>Цена2: <span v-text="salonyURL.price.max" /></p>
		</div>
		<div class="col-span-full border border-main shadow-neon rounded-md p-4">
			<p v-text="`Сейчас онлайн`" />
			<Btn sec class="gap-2 !px-4 !w-full" :to="salonyURL.url">
				<Icon svg="telegram" class="border-white" />
			</Btn>
		</div>
	</section>
</template>
<script setup>
import { getScreens } from '@/config/screens'
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useSalony } from '@/store/salony.js'
const { getSalonyURL } = useSalony()
const { salonyURL } = storeToRefs(useSalony())
watchEffect(() => getSalonyURL())
</script>
