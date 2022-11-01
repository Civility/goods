<template>
	<component :is="isComponent" class="btn" :class="isClass" :type="isType" :to="to">
		<slot />
	</component>
</template>
<script setup>
const NuxtLink = resolveComponent('NuxtLink')
definePageMeta({
	keepalive: true,
})
const props = defineProps({
	to: String,
	sec: Boolean,
	clean: Boolean,
	glue: Boolean,
})
const isComponent = computed(() => (props.to ? NuxtLink : 'button'))
const isType = computed(() => (isComponent != 'button' ? null : 'button'))
const isClass = computed(() => {
	return {
		btn__sec: props.sec,
		btn__clear: props.clean,
		btn__glue: props.glue,
	}
})
</script>
<style lang="postcss" scoped>
.btn {
	@apply inline-flex items-center justify-center gap-x-2;
	@apply py-2 px-2;
	@apply rounded-lg;
	@apply md:w-64 w-auto;
	@apply box-decoration-clone bg-gradient-to-r from-sec-light to-main-light;
	@apply hover:to-main hover:from-sec hover:shadow-neon;
	@apply text-white;
	@apply text-sm xl:text-lg md:text-base;
	@apply align-middle not-italic;

	@apply transition duration-300;
	@apply focus:ring-0 focus:outline-none;
	@apply disabled:bg-disabled disabled:cursor-not-allowed disabled:shadow-none;
	@apply disabled:isolate disabled:pointer-events-none;
	-webkit-appearance: none;

	&__sec {
		@apply !bg-sec hover:bg-sec-darker;
		@apply box-decoration-clone bg-gradient-to-r from-sec to-main;
	}
	&__clear {
		@apply rounded-none hover:bg-transparent hover:shadow-none w-auto bg-transparent !bg-none;
	}
	&__glue {
		@apply after:absolute after:inset-0 after:content-[''] after:z-10;
	}
}
</style>
