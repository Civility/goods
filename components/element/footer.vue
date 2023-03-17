<template>
	<footer class="footer box-decoration-slice bg-gradient-to-b from-sec-darker to-some-dark py-8 mt-auto">
		<div class="container flex flex-col">
			<span class="flex flex-wrap justify-between gap-4">
				<dl v-for="(point, index) in contact" :key="index">
					<dt class="text-2xl mb-1">{{ point.address.city }}</dt>
					<dd class="text-xl py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
						<Btn clean class="gap-2 !w-auto" :to="`//t.me/${point.number}`">
							<Svg svg="ic:baseline-call" class="border-white" />
						</Btn>
						{{ point.address.street }}
					</dd>
				</dl>
			</span>
			<span class="gap-4 flex flex-col lg:ml-auto">
				<Btn sec class="gap-2 mb-3" @click="openModal('map')">
					<Svg svg="ic:baseline-place" class="border-white" />
					Карта
				</Btn>
				<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
					<template #body>
						<div class="flex flex-col gap-4">
							<div class="w-full bg-sec">
								<h5 class="font-bold text-center pt-2 px-2">м.Комендантский пр.</h5>
								<iframe
									src="https://yandex.ru/map-widget/v1/?um=constructor%3A9856f1dcf4ab496f6cd58b3ea808c40a12a2d76e66d7509e906d84f28e4ddc2c&amp;source=constructor"
									width="100%"
									height="450"
									frameborder="0"
								></iframe>
							</div>
							<div class="w-full pt-4 bg-main-light">
								<h5 class="font-bold text-center pt-2 px-2">г.Всеволожск</h5>
								<iframe
									src="https://yandex.ru/map-widget/v1/?um=constructor%3Aee45baa473a58644773602901a80c95250b7b63218cc4fd11953aa903274148f&amp;source=constructor"
									width="100%"
									height="450"
									frameborder="0"
								></iframe>
							</div>
							<div class="w-full pt-4 bg-some-light">
								<h5 class="font-bold text-center pt-2 px-2">г.Кингисепп</h5>
								<iframe
									src="https://yandex.ru/map-widget/v1/?um=constructor%3A65ac3539a1141dabd34d8afc38e6ee1f99a78acca779f5b07ccfea457fac25bf&amp;source=constructor"
									width="100%"
									height="450"
									frameborder="0"
								></iframe>
							</div>
						</div>
					</template>
				</Modal>
			</span>
			<div class="flex mt-auto text-xs text-white/70">
				<span class="max-w-max">{{ COPYRIGHT.low }}</span>
			</div>
		</div>
	</footer>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { contact } = storeToRefs(useMain())
const { COPYRIGHT } = useMain()
const getUserRepositories = async () => {
	repositories.value = await fetchUserRepositories(props.user)
}
const showModal = shallowRef(null)

const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
