<template>
	<main class="relative overflow-hidden" v-if="localS">
		<div v-if="$nuxt.isOffline">You are offline</div>
		<section
			@mousemove="mouseWatch"
			class="relative bg-no-repeat bg-cover bg-scroll py-15"
			style="background-image: url('/img/bg.webp');"
		>
			<MouseParallax x="50" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__main" v-if="useMq().mdPlus" />
			<MouseParallax x="50" y="10" :mouseX="elX" :mouseY="elY" class="mouse-parallax__sec" v-if="useMq().mdPlus" />
			<MouseParallax x="10" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__some" v-if="useMq().mdPlus" />
			<div class="container flex flex-col justify-center items-center w-full h-full gap-12 md:px-20">
				<div
					class="relative z-10 flex flex-col gap-6 justify-center items-center shadow-neon backdrop-blur rounded-md md:py-10 md:px-5"
				>
					<div class="text-xl border border-dark px-5 py-3 bg-dark/70 rounded-lg lg:mx-24 md:mx-10">
						<h1 class="uppercase text-center mb-5      text-neon">АКТИВ-ПИТЕР</h1>
						<ul v-for="text in mainTextList" class="list-disc list-inside">
							<li v-text="text" />
						</ul>
						
						<dd class="my-5" >
							<dt class="mb-2 underline decoration-sec underline-offset-2 flex gap-3 justify-center items-center">
								<Svg svg="ic:baseline-checklist-rtl" /> У нас вы можете взять в аренду:</dt>
							<dl>- мангальные зоны </dl>
							<dl>- бани-это 2-х этажный коттедж, который будет находиться только в вашем распоряжении</dl>
						</dd>
						<i class="font-neon">Звоните <a href="tel:+79057961" class="text-main text-3xl ">905 79 61</a> (Всеволожск) в любое время и мы ответим на все интересующие Вас вопросы</i>
					</div>
				</div>
			</div>
		</section>
		<section class="container md:py-10 py-8">
			<div class="wrap-full lg:gap-10 mb-8">
				<LazyCard
					v-for="staff in goodslist"
					:key="staff.url"
					class="lg:col-span-3 md:col-span-4 sm:col-span-3 col-span-full"
					:data="staff"
				/>
			</div>
			<div class="col-span-full">
				<Btn @click="addShow()" class="!w-full !py-4">
					<Svg svg="ic:round-arrow-back-ios-new" :class="size >= total ? 'rotate-90' : '-rotate-90'" />
					{{ textShow }}
				</Btn>
			</div>
		</section>
	</main>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const config = useRuntimeConfig()
const { getGoods } = useMain()
const { goods, goodsLength } = storeToRefs(useMain())
const { pending: goodsWait, data: goodsData, error } = await useLazyAsyncData('goods', () => getGoods(config.public.PUBLIC_NAME))
if (error.value) {
	await navigateTo(`/`)
	throw createError()
}
const elX = shallowRef(0)
const elY = shallowRef(0)
const mouseWatch = (val) => {
	elX.value = val.clientX / window.innerWidth
	elY.value = val.clientY / window.innerHeight
}
const goodsref = ref(goods)
const total = shallowRef(goodsLength)

const size = shallowRef(useMq().smPlus ? 4 : 2)
const SizeStatic = shallowRef(useMq().smPlus ? 4 : 2)
const addItem = shallowRef(useMq().smPlus ? 4 : 2)

const textShow = computed(() => (size.value >= total.value ? 'Скрыть' : 'Показать ещё'))

const goodslist = computed(() => goodsref.value.slice(0, size.value))

const addShow = () => (total.value > size.value ? (size.value += addItem.value) : (size.value = SizeStatic.value))

const localS = ref(false)

if (process.client) {
	localS.value = computed(() => localStorage.verification)
}
const mainTextList = [
	'У нас в гостях Вам будет так же уютно, как дома',
	'Спокойная атмосфера наших апартаментов располагает на отдых',
	'Доброжелательный прием и Внимательный персонал всегда учтёт Ваши пожелания.',
	'Бесплатные чай/кофе',
	'Честно работаем уже более 7лет',
	'Нам можно доверять',
	'Большой ассортимент бара',
	'Заказ еды или приготовление Шашлыков',
]
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
