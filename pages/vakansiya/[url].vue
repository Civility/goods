<template>
	<section
		@mousemove="mouseWatch"
		class="md:py-10 py-8 mr-4 w-full relative bg-no-repeat bg-cover bg-scroll rounded-lg"
		:style="`background-image: url('${config.public.G_IMG}${vacancyURL.img?.big}');`"
		v-if="!vacancyWait"
	>
		<MouseParallax x="50" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__main" v-if="useMq().mdPlus" />
		<MouseParallax x="50" y="10" :mouseX="elX" :mouseY="elY" class="mouse-parallax__sec" v-if="useMq().mdPlus" />
		<MouseParallax x="10" y="50" :mouseX="elX" :mouseY="elY" class="mouse-parallax__some" v-if="useMq().mdPlus" />
		<div class="relative z-10 text-shadow shadow-inner rounded-md py-10 px-5 bg-dark/50">
			<h2 v-text="vacancyURL.title" />
			<div v-html="vacancyURL.text" />
		</div>

	</section>
				<Head>
				<Title>{{ vacancyURL.title }}</Title>
				<Meta name="keywords" :content="metaKeywords" />
			</Head>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useVacancy } from '@/store/vacancy.js'
const config = useRuntimeConfig()
const { getVacancyURL, getVacancy } = useVacancy()
const { vacancyURL } = storeToRefs(useVacancy())

const { pending: vacancyWait, data: vacancyData, error } = await useLazyAsyncData('vacancy', () => getVacancy(config.public.PUBLIC_NAME))
watchEffect(() => getVacancyURL())
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
const metaKeywords = ref(vacancyURL.value.keywords.map(i => i.keyword))
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
