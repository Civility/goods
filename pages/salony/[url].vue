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
		<div class="xl:col-span-4 col-span-full border border-main rounded-md p-4" v-if="salonyURL.text || salonyURL.description">
			<div v-html="salonyURL?.text" />
			<div v-html="salonyURL?.description" />
		</div>

		<div
			class="xl:col-span-1 md:col-span-3 col-span-full border border-main shadow-neon rounded-md p-4 flex flex-col"
			v-if="salonyURL.price"
		>
			<dl class="flex">
				<dd v-if="salonyURL.price.min" class="w-24 text-left text-sec-lighter">в салоне</dd>
				<dt v-if="salonyURL.price.min" v-text="salonyURL.price.min"></dt>
			</dl>

			<dl class="flex">
				<dd v-if="salonyURL.price.max" class="w-24 text-left text-sec-lighter">с выездом</dd>
				<dt v-if="salonyURL.price.max" v-text="salonyURL.price.max"></dt>
			</dl>
		</div>

		<div class="xl:col-span-1 md:col-span-3 col-span-full border border-main shadow-neon rounded-md p-4" v-if="salonyURL.socials">
			<Btn clean class="gap-2 !px-4 !w-full" :to="socials.url" v-for="socials of salonyURL.socials">
				Сегодня работают<Svg :svg="`ic:outline-${socials.title}`" class="border-transparent" />
			</Btn>
		</div>
		 		<Head>
      <Title>{{ salonyURL.title }}</Title>
      <Meta name="keywords" :content="salonyURL.keywords" />
    </Head>
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
