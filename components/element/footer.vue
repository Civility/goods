<template>
	<footer class="footer box-decoration-slice bg-gradient-to-b from-sec-darker to-some-dark py-8 mt-auto">
		<div class="container wrap">
			<span class="md:col-span-4 col-span-full flex flex-col gap-4">
				<div class="flex flex-wrap lg:flex-nowrap gap-4">
					<dl v-for="(point, index) in contact" :key="index">
						<dt class="text-2xl mb-1">{{ point.address.city }}</dt>
						<dd class="text-xl py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
							<Btn clean class="gap-2 !w-auto" :to="`//t.me/${point.number}`">
								<Svg svg="ic:baseline-call" class="border-white" />
							</Btn>
							{{ point.address.street }}
						</dd>
					</dl>
				</div>
			</span>
			<span class="md:col-span-2 col-span-full gap-4 flex flex-col">
				<div class="w-full">
					<Btn sec class="gap-2 !w-full mb-3" @click="openModal('map')">
						<Svg svg="ic:baseline-place" class="border-white" />
						Карта
					</Btn>
					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<template #body> <img src="~/assets/img/map1.webp" alt="map" /> </template>
					</Modal>
				</div>
			</span>
			<div class="col-span-full flex gap-4 mt-auto text-xs text-white/70">
				<span class="max-w-max">{{ COPYRIGHT.low }}</span>
			</div>
		</div>
		<Modal refName="verification" :show="!localverification" @isClickShow="(val) => isShow(val)" class="bg-sec-light">
			<template #body>
				<h4 class="text-main">У Вас все хорошо ?</h4>
			</template>
			<template #footer>
				<Btn @click="isHelp(true)">Да</Btn>
				<Btn @click="isHelp(false)">Нет</Btn>
			</template>
		</Modal>
	</footer>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { contact } = storeToRefs(useMain())
const { COPYRIGHT, VERIFICATION } = useMain()
const getUserRepositories = async () => {
	repositories.value = await fetchUserRepositories(props.user)
}
const showModal = shallowRef(null)

const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)

const localverification = ref(false)
function isVerification() {
	if (process.client) {
		localverification.value = localStorage.verification ?? localverification.value
	}
}
function isHelp(val) {
	if (process.client) {
		localStorage.setItem('verification', val)

		if (val) {
			localverification.value = val
		}
	}
}
onMounted(() => {
	isVerification()
})
</script>
