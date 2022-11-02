<template>
	<i class="border rounded-full w-10 h-10 flex items-center justify-center">
		<img :src="`~/assets/svg/${svg}.svg`" width="24" height="24" :alt="svg" />
	</i>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
defineProps({
	svg: {
		type: String,
		default: null,
	},
})
</script>
