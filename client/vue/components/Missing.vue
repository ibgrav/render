<template>
  <strong>Missing component {{ name }}</strong>
</template>

<script setup lang="ts">
const { name } = defineProps({ name: String });
</script>
