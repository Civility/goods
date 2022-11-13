<template>
	<section class="md:py-10 py-8 mr-4 w-full wrap">
		<div class="col-span-full">
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
					<img :src="`${config.G_IMG}${slider}`" :alt="slider" class="w-full h-full object-cover" />
					<nav class="absolute inset-0 w-full h-full flex justify-between">
						<Btn clean id="salonyPrev" class="salony__nav-prev"><Svg svg="ic:twotone-arrow-back-ios-new" /></Btn>
						<Btn clean id="salonyNext" class="salony__nav-next"><Svg svg="ic:twotone-arrow-forward-ios" /></Btn>
					</nav>
				</template>
			</Slider>
		</div>
		<div class="lg:col-span-4 col-span-full border border-main rounded-md p-4" v-if="salonyURL.text || salonyURL.description">
			<div v-html="salonyURL?.text" />
			<div v-html="salonyURL?.description" />
		</div>

		<div class="lg:col-span-1 col-span-full border border-main rounded-md p-4" v-if="salonyURL.price">
			<p v-if="salonyURL.price.min">Цена 1: <span v-text="salonyURL.price.min" /></p>
			<p v-if="salonyURL.price.max">Цена 2: <span v-text="salonyURL.price.max" /></p>
		</div>

		<div class="lg:col-span-1 col-span-full border border-main shadow-neon rounded-md p-4" v-if="salonyURL.socials">
			<Btn clean class="gap-2 !px-4 !w-full" :to="`https://telegram.me/${socials.url}`" v-for="socials of salonyURL.socials">
				<Svg :svg="`ic:outline-${socials.title}`" class="border-transparent" />
				Сегодня работают
			</Btn>
		</div>
	</section>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useSalony } from '@/store/salony.js'
const config = useRuntimeConfig().public
const url = useRoute().params.url
const { getSalonyURL } = useSalony()
const { salonyURL } = storeToRefs(useSalony())

const { pending: salonyURLWait, data: salonyURLData, refresh } = useLazyAsyncData('salonyurl', () => getSalonyURL(config.PUBLIC_NAME, url))
</script>
