<template>
	<main class="staff relative overflow-hidden" v-if="!staffWait">
		<section class="container wrap-full relative md:py-10 py-8">
			<div class="col-span-4 md:col-start-2 mb-8 wrap place-content-start">
				<h1 class="col-span-full font-neon text-neon" v-text="STAFF.name" />

				<div class="col-span-6">
					<Slider
						:data="STAFF.slider"
						:spaceBetween="10"
						:slidesPerView="1"
						loop
						:effect="'fade'"
						:fadeEffect="{ crossFade: true }"
						:navigation="false"
						:grabCursor="true"
						:thumbs="{ swiper: thumbsSwiper }"
						:autoplay="{
							delay: 4000,
							disableOnInteraction: true,
						}"
						:pagination="{
							clickable: true,
						}"
					>
						<template #content="{ slider }">
							<img
								:src="`${config.public.G_IMG}${slider}`"
								:alt="slider"
								class="block w-full h-full object-cover max-h-[470px]"
							/>
						</template>
					</Slider>
					<Slider
						@swiper="setThumbsSwiper"
						:data="STAFF.slider"
						:spaceBetween="40"
						:slidesPerView="2.5"
						:freeMode="true"
						:watchSlidesProgress="true"
						:loop="false"
						:navigation="false"
						:grabCursor="true"
						:direction="'horizontal'"
					>
						<template #content="{ slider }">
							<img :src="`${config.public.G_IMG}${slider}`" :alt="slider" class="w-full h-full object-cover" />
						</template>
					</Slider>
				</div>
			</div>
			<div class="col-span-5 md:col-start-7 wrap mb-8 place-content-start">
				<!-- <h3 class="text-4xl lg:text-5xl leading-tight uppercase font-neon col-span-full" v-text="staffData.address" /> -->
				<dl v-for="salony in STAFF.salony" class="col-span-full">
					<dt v-text="salony.city" class="uppercase font-neon" />
					<dd v-text="salony.street" />
				</dl>
				<div class="divide-y-4 divide-double divide-sec-darker col-span-full">
					<h4 class="font-neon">Параметры</h4>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Возраст</dt>
						<dd class="col-span-4 col-start-3" v-text="STAFF.options.age" />
						<dt class="col-span-2">Размер</dt>
						<dd class="col-span-4 col-start-3" v-text="STAFF.options.size" />
						<dt class="col-span-2">Рост</dt>
						<dd class="col-span-4 col-start-3" v-text="STAFF.options.tall" />
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Услуги</dt>
						<dd class="col-span-4 col-start-3" v-for="(uslugi, idx) in STAFF.uslugi" :key="idx">
							{{ uslugi }}
						</dd>
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4" v-if="STAFF.price?.min">
						<dt class="col-span-2">Price min</dt>
						<dd class="col-span-4 col-start-3" v-text="`${STAFF.price?.min} час`" />
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4" v-if="STAFF.price?.max">
						<dt class="col-span-2">Price max</dt>
						<dd class="col-span-4 col-start-3" v-text="`${STAFF.price?.max} час`" />
					</dl>
				</div>
			</div>
			<div class="col-span-10 md:col-start-2 wrap" v-if="STAFF.text">
				<div
					class="about col-span-full md:col-span-3 border border-black rounded-lg py-2 px-3 border-neon bg-gradient-to-r from-main to-main-dark"
					v-html="STAFF?.text"
				/>
				<div class="md:col-span-3 flex gap-4 mt-auto">
					<Btn clean to="https://telegram.me/+79215542968">
						<Svg svg="logos:telegram" class="border-white" />
					</Btn>
					<Btn clean to="https://wa.me/+79215542968">
						<Svg svg="logos:whatsapp-icon" class="border-white" />
					</Btn>
				</div>
			</div>
		</section>
	</main>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const config = useRuntimeConfig()
const { getStaff, SOCIALS } = useMain()
const { STAFF } = storeToRefs(useMain())

const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)

const { pending: staffWait, data: staffData, error } = useLazyAsyncData('staff', () =>
	getStaff(config.public.PUBLIC_NAME, useRoute().params.url)
)
// const { data: staffData, pending, error } = await useFetch(`${config.public.PUBLIC_NAME}/api/goods/${useRoute().params.url}`)

if (error.value) {
	await navigateTo(`/`)
	throw createError()
}
const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => (thumbsSwiper.value = swiper)
</script>
<style lang="postcss">
.about {
	& > * {
		font-size: larger;
	}
}
</style>
