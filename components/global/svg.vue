<template>
	<i class="border rounded-full w-10 h-10 flex items-center justify-center">
		<Icon :name="svg" size="24" />
	</i>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
defineProps({
	svg: String,
})
</script>
