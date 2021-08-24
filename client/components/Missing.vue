<template>
  <strong>Missing component {{ name }}</strong>
</template>

<script setup>
const { name } = defineProps({ name: String });
</script>
