<template>
	<section @mousemove="mouseWatch" class="md:py-10 py-8 mr-4 w-full relative wrap rounded-lg" v-if="uslugiURL">
		<MouseParallax x="50" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__main" v-if="useMq().mdPlus" />
		<MouseParallax x="50" y="10" :mouseX="elX" :mouseY="elY" class="mouse-parallax__sec" v-if="useMq().mdPlus" />
		<MouseParallax x="10" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__some" v-if="useMq().mdPlus" />
		<div class="col-span-full">
			<Slider
				:data="uslugiURL.slider"
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
					prevEl: '#uslugiPrev',
					nextEl: '#uslugiNext',
				}"
				:pagination="{
					clickable: true,
				}"
			>
				<template #content="{ slider }">
					<img :src="`${config.G_IMG}${slider}`" :alt="slider" class="w-full h-full object-cover" />
					<nav class="absolute inset-0 w-full h-full flex justify-between">
						<Btn clean id="uslugiPrev" class="uslugi__nav-prev"><Svg svg="ic:twotone-arrow-back-ios-new" /></Btn>
						<Btn clean id="uslugiNext" class="uslugi__nav-next"><Svg svg="ic:twotone-arrow-forward-ios" /></Btn>
					</nav>
				</template>
			</Slider>
		</div>
		<div class="col-span-full relative z-10 text-shadow shadow-inner rounded-md py-10 px-5 bg-dark/50">
			<h2 v-text="uslugiURL?.title" />
			<div v-html="uslugiURL?.text" />
		</div>
	</section>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useUslugi } from '@/store/uslugi.js'
const config = useRuntimeConfig().public
const url = useRoute().params.url
const { getUslugiURL } = useUslugi()
const { uslugiURL } = storeToRefs(useUslugi())
const { pending: uslugiURLWait, data: uslugiURLData } = useLazyAsyncData('uslugiurl', () => getUslugiURL(config.PUBLIC_NAME, url))
const elX = shallowRef(0)
const elY = shallowRef(0)
const mouseWatch = (val) => {
	elX.value = val.clientX / window.innerWidth
	elY.value = val.clientY / window.innerHeight
}
</script>
<style lang="postcss" scoped>
.mouse-parallax {
	&__main {
		@apply right-2/3  top-0;
		@apply w-32 h-32;
		@apply border-main-light;
		@apply shadow-mainLight;
	}
	&__sec {
		@apply right-0 top-1/4;
		@apply w-24 h-24;
		@apply border-sec-light;
		@apply shadow-secLight;
	}

	&__some {
		@apply left-2/3 bottom-0;
		@apply w-40 h-40;
		@apply shadow-someLight;
		@apply border-some-light;
	}
}
</style>
