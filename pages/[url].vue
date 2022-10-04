<template>
	<main class="staff relative overflow-hidden">
		<section class="container wrap-full relative md:py-10 py-8">
			<div class="col-span-4 md:col-start-2 mb-8 wrap">
				<h1 class="col-span-full font-neon text-neon" v-text="STAFF.name" />
				<div class="col-span-6">
					<!--  SwiperEffectCreative, -->
					<Swiper
						:modules="modules"
						:spaceBetween="10"
						:slidesPerView="1"
						:loop="true"
						:effect="'flip'"
						:navigation="false"
						:grabCursor="true"
						:thumbs="{ swiper: thumbsSwiper }"
						:fadeEffect="{ crossFade: true }"
						:autoplay="{
							delay: 4000,
							disableOnInteraction: true,
						}"
						:pagination="{
							clickable: true,
						}"
						:creative-effect="{
							prev: {
								shadow: false,
								translate: ['-10%', 0, -1],
							},
							next: {
								translate: ['100%', 0, 0],
							},
						}"
					>
						<!-- :pagination="{ clickable: true, el: '.banner__nav', type: 'bullets' }" -->
						<SwiperSlide v-for="(slide, id) in STAFF.slider" :key="id">
							<img :src="`/img/slider/${slide}`" :alt="id" class="block w-full h-full object-cover max-h-[470px]" />
						</SwiperSlide>
					</Swiper>
					<!-- <div class="flex md:max-h-[80vh]"> -->
					<Swiper
						@swiper="setThumbsSwiper"
						:spaceBetween="40"
						:slidesPerView="2.5"
						:freeMode="true"
						:watchSlidesProgress="true"
						:loop="false"
						:navigation="false"
						:grabCursor="true"
						:modules="modules"
						:direction="'horizontal'"
					>
						<SwiperSlide v-for="(item, key) in STAFF.slider" :key="key">
							<img :src="`/img/slider/${item}`" :alt="key" class="w-full h-full object-cover" />
							<!-- class="  w-full h-full object-cover" -->
						</SwiperSlide>
					</Swiper>
					<!-- </div> -->
				</div>
			</div>
			<div class="col-span-5 md:col-start-7 wrap mb-8">
				<h3 class="text-4xl lg:text-5xl leading-tight uppercase font-neon col-span-full" v-text="STAFF.address" />
				<div class="divide-y-4 divide-double divide-sec-darker col-span-full">
					<h4 class="font-neon">Параметры</h4>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Age</dt>
						<dd class="col-span-4" v-text="STAFF.options.age" />
						<dt class="col-span-2">Size</dt>
						<dd class="col-span-4" v-text="STAFF.options.size" />
						<dt class="col-span-2">Tall</dt>
						<dd class="col-span-4" v-text="STAFF.options.tall" />
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt :class="`col-span-2 row-span-${STAFF.options.services.length}`">Services</dt>
						<dd class="col-span-4" v-for="(service, idx) in STAFF.options.services" :key="idx">
							{{ service }}
						</dd>
					</dl>
					<dl class="wrap gap-y-3 gap-x-4 mb-8 py-4">
						<dt class="col-span-2">Price min</dt>
						<dd class="col-span-4" v-text="`${STAFF.price.min} час`" />
						<dt class="col-span-2">Price max</dt>
						<dd class="col-span-4" v-text="`${STAFF.price.max} час`" />
					</dl>
				</div>
			</div>
			<div class="col-span-10 md:col-start-2 wrap">
				<div
					class="about col-span-full md:col-span-3 border border-black rounded-lg py-2 px-3 border-neon bg-gradient-to-r from-main to-main-dark"
					v-html="STAFF.about"
				/>
				<div class="col-span-full md:col-span-3 flex flex-wrap gap-4 mt-auto">
					<template v-for="soc in socials" :key="soc.title">
						<Button class="gap-2 !px-4 !w-full" :link="soc.url">
							<i class="border border-white rounded-full w-10 h-10 flex items-center justify-center">
								<img :src="`/assets/svg/${soc.icon}`" width="24" height="24" :alt="soc.title"
							/></i>
							{{ soc.title }}</Button
						>
					</template>
 
				</div>
			</div>
		</section>
	</main>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store/main.js'
const { getStaff, socials } = useMainStore()
const { MODALTOGGLE } = storeToRefs(useMainStore())
const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
// const { pending: staffWait, data: staff, error } = useLazyAsyncData('staff', () => getStaff(useRoute().params.url))
const { data: STAFF, pending, error } = await useFetch(`http://localhost:3000/local/${useRoute().params.url}.json`)

if (error.value) {
	await navigateTo(`/`)
	throw createError()
}

const modules = [
	SwiperAutoplay,
	SwiperEffectCreative,
	SwiperFreeMode,
	SwiperNavigation,
	SwiperPagination,
	SwiperMousewheel,
	SwiperThumbs,
	SwiperEffectFade,
	SwiperEffectFlip,
	SwiperEffectCards,
]
const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => (thumbsSwiper.value = swiper)

// const setDirection = computed(() => (useMq().mdPlus ? 'vertical' : 'horizontal'))
</script>
<style lang="postcss">
.about {
	& > * {
		font-size: larger;
	}
}
.swiper-slide-prev {
	@apply !opacity-0;
}
.swiper-pagination {
	@apply flex justify-center items-center w-full my-4 mx-auto;
	&-bullet {
		@apply relative z-10;
		@apply border border-solid rounded-circle border-transparent;
		@apply flex justify-center items-center;
		@apply before:content-[''] before:w-2 before:h-2 before:opacity-60 before:border before:border-solid before:border-main  before:shadow-neon before:rounded-circle;
		@apply w-4 h-4;
		@apply mx-3;
		@apply cursor-pointer;
		&-active {
			@apply border-sec shadow-neon;
			@apply before:bg-main  before:opacity-100;
		}
	}
}
</style>
