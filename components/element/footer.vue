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
			<span class="gap-4 flex flex-col ml-auto ">
					<Btn sec class="gap-2 !w-64	 mb-3" @click="openModal('map')">
						<Svg svg="ic:baseline-place" class="border-white" />
		    				Карта
					</Btn>
					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<template #body> <img src="~/assets/img/map1.webp" alt="map" /> </template>
					</Modal>
			</span>
			<div class="flex  mt-auto text-xs text-white/70">
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
