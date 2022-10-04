<template>
	<main class="relative overflow-hidden">
		<section
			@mousemove="mouseWatch"
			class="banner relative h-[90vh] bg-no-repeat bg-cover bg-scroll"
			style="background-image: url('/img/bg.webp');"
		>
			<MouseParallax x="50" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__main" v-if="useMq().mdPlus" />
			<MouseParallax x="50" y="10" :mouseX="elX" :mouseY="elY" class="mouse-parallax__sec" v-if="useMq().mdPlus" />
			<MouseParallax x="10" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__some" v-if="useMq().mdPlus" />
			<div class="flex flex-col justify-center items-center w-full h-full gap-12">
				<div class="z-10 flex flex-wrap gap-6 justify-center">
					<Button class="shadow-neon min-w-[14rem] uppercase gap-2" :link="`//t.me/${PHONE1}`">
						<i class="border border-main-lighter rounded-full w-10 h-10 flex items-center justify-center">
							<img src="/assets/svg/telegram.svg" width="24" height="24" alt="telegram"
						/></i>
						Telegram
					</Button>
					<Button class="shadow-neon z-10 min-w-[14rem] uppercase gap-2" :link="`//wa.me/${PHONE2}`">
						<i class="border border-main-lighter rounded-full w-10 h-10 flex items-center justify-center">
							<img src="/assets/svg/whatsapp.svg" width="24" height="24" alt="whatsapp"
						/></i>
						Whatsapp
					</Button>
				</div>
				<div class="absolute w-[90vw] h-[80vh] bg-white bg-opacity-20 backdrop-blur rounded-md shadow-neon" />
			</div>
		</section>
		<section class="container md:py-10 py-8">
			<div class="wrap-full lg:gap-10 mb-8">
				<LazyCard
					v-for="staff in GOODSLIST"
					:key="staff.url"
					class="lg:col-span-3 md:col-span-4 sm:col-span-3 col-span-full"
					:data="staff"
				/>
			</div>
			<div class="col-span-full">
				<Button @click="addShow()" class="!w-full !py-4">
					{{ textShow }}
				</Button>
			</div>
		</section>
	</main>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'

const { getGoods, PHONE1, PHONE2 } = useMainStore()
const { GOODS, GOODSLENGTH } = storeToRefs(useMainStore())
const { pending: goodsWait, data: goods } = await useLazyAsyncData('goods', () => getGoods())

const elX = shallowRef(0)
const elY = shallowRef(0)
const mouseWatch = (val) => {
	elX.value = val.clientX / window.innerWidth
	elY.value = val.clientY / window.innerHeight
}
const GOODSREF = ref(GOODS)
const total = shallowRef(GOODSLENGTH)

const size = shallowRef(useMq().smPlus ? 4 : 2)
const SizeStatic = shallowRef(useMq().smPlus ? 4 : 2)
const addItem = shallowRef(useMq().smPlus ? 4 : 2)

const textShow = computed(() => (size.value >= total.value ? 'Скрыть' : 'Показать ещё'))

const GOODSLIST = computed(() => GOODSREF.value.slice(0, size.value))

const addShow = () => (total.value > size.value ? (size.value += addItem.value) : (size.value = SizeStatic.value))
</script>
<style lang="postcss">
.mouse-parallax {
	&__main {
		@apply left-8 bottom-3/4;
		@apply w-40 h-40;
		@apply border-main-light;
		@apply shadow-mainLight;
	}
	&__sec {
		@apply right-40 bottom-1/4;

		@apply w-32 h-32;
		@apply border-sec-light;
		@apply shadow-secLight;
	}

	&__some {
		@apply left-4 bottom-1/2;
		@apply w-24 h-24;
		@apply border-some-light;
		@apply shadow-someLight;
	}
}
</style>
