<template>
	<span class="mouse-parallax" :style="`transform: translate(${mouseX * x}px, ${mouseY * y}px);`" />
</template>

<script setup>
defineProps({
	x: {
		type: [Number, String],
		default: 0,
	},
	y: {
		type: [Number, String],
		default: 0,
	},
	mouseX: [Number, String],
	mouseY: [Number, String],
})
</script>
<style lang="postcss" scoped>
.mouse-parallax {
	@apply absolute z-10;
	@apply transition-transform origin-center duration-1000 ease-expo;
	@apply hidden md:block;
	@apply rounded-circle border-double;
	@apply border-[0.6rem];
	@apply backdrop-blur-sm;
}
</style>
