<template
	><Teleport to="body">
		<div
			:class="`modal-${refName}`"
			class="modal"
			:ref="refName"
			v-if="showModal"
			aria-modal="true"
			aria-labelledby="modal-headline"
			@click="$emit('isClickShow', false)"
		>
			<transition
				enter-active-class="transition ease-out duration-200 transform"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition ease-in duration-200 transform"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div class="flex items-center justify-center min-h-screen pt-24 text-center">
					<div class="bg-white rounded-lg text-left overflow-hidden p-4 w-4/5 shadow-neon" :class="bgclass">
						<div class="modal__header relative">
							<Button clear class="modal__btn__close group absolute right-0 top-0" @click="$emit('isClickShow', false)">
								<i
									class="border border-main-lighter rounded-full w-10 h-10 flex items-center justify-center relative group-hover:bg-main group-hover:text-white group-hover:shadow-neon"
								>
									X
								</i>
							</Button>
						</div>
						<div class="modal__body" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
							<slot name="body" />
						</div>
						<div class="modal__footer">
							<slot name="footer" />
						</div>
					</div></div
			></transition></div
	></Teleport>
</template>
<script setup>
import { mapActions, storeToRefs } from 'pinia'
import { useMainStore } from '@/store/main'
const { MODALTOGGLE } = storeToRefs(useMainStore())
const { getModalToggle } = mapActions(useMainStore, ['getModalToggle']) // closed header

defineEmits(['isClickShow'])
definePageMeta({
	keepalive: true,
})
const props = defineProps({
	bgclass: String,
	show: {
		type: Boolean,
		default: false,
	},
	refName: {
		type: String,
		required: true,
	},
})
const showModal = ref(false)
// const isShow = (val) => (showModal.value = val)

watch(
	() => props.show,
	(show) => {
		showModal.value = show
	}
)
function closeModal() {
	showModal.value = false
}
useHead({
	bodyAttrs: {
		class: showModal.value ? 'over-hidden' : null,
	},
})
</script>

<style lang="postcss" scoped>
.modal {
	@apply fixed z-30 inset-0 overflow-y-auto bg-main/70 bg-opacity-50;
}
</style>
