<template>
	<main class="staff relative overflow-hidden">
		<section class="container wrap-full relative md:py-10 py-8">
			<div class="col-span-4 md:col-start-2 mb-8 wrap place-content-start">
				<h1 class="col-span-full font-neon text-neon" v-text="staffData.name" />
				<div class="col-span-6">
					<Slider
						:data="staffData.slider"
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
							<img :src="`/img/slider/${slider}`" :alt="slider" class="block w-full h-full object-cover max-h-[470px]" />
						</template>
					</Slider>
					<Slider
						@swiper="setThumbsSwiper"
						:data="staffData.slider"
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
							<img :src="`/img/slider/${slider}`" :alt="slider" class="w-full h-full object-cover" />
						</template>
					</Slider>
				</div>
			</div>
			<div class="col-span-5 md:col-start-7 wrap mb-8 place-content-start">
				<h3 class="text-4xl lg:text-5xl leading-tight uppercase font-neon col-span-full" v-text="staffData.address" />
				<div class="divide-y-4 divide-double divide-sec-darker col-span-full">
					<h4 class="font-neon">Параметры</h4>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Age</dt>
						<dd class="col-span-4" v-text="staffData.options.age" />
						<dt class="col-span-2">Size</dt>
						<dd class="col-span-4" v-text="staffData.options.size" />
						<dt class="col-span-2">Tall</dt>
						<dd class="col-span-4" v-text="staffData.options.tall" />
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt :class="`col-span-2 row-span-${staffData.options.services.length}`">Services</dt>
						<dd class="col-span-4" v-for="(service, idx) in staffData.options.services" :key="idx">
							{{ service }}
						</dd>
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Price min</dt>
						<dd class="col-span-4" v-text="`${staffData.price.min} час`" />
						<dt class="col-span-2">Price max</dt>
						<dd class="col-span-4" v-text="`${staffData.price.max} час`" />
					</dl>
				</div>
			</div>
			<div class="col-span-10 md:col-start-2 wrap">
				<div
					class="about col-span-full md:col-span-3 border border-black rounded-lg py-2 px-3 border-neon bg-gradient-to-r from-main to-main-dark"
					v-html="staffData.about"
				/>
				<div class="col-span-full md:col-span-3 flex flex-wrap gap-4 mt-auto">
					<template v-for="soc in SOCIALS" :key="soc.title">
						<Btn class="gap-2 !px-4 !w-full" :to="soc.url">
							<Icon :svg="soc.icon" class="border-white" />
							{{ soc.title }}
						</Btn>
					</template>
				</div>
			</div>
		</section>
	</main>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { getStaff, SOCIALS } = useMain()
// const { modalToggle } = storeToRefs(useMain())
const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
// const { pending: staffWait, data: staff, error } = useLazyAsyncData('staff', () => getStaff(useRoute().params.url))
const { data: staffData, pending, error } = await useFetch(`http://localhost:3000/local/${useRoute().params.url}.json`)

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
