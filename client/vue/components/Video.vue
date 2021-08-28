<template>
  <div class="red">This is a video. Message: {{ message }}</div>
</template>

<script setup lang="ts">
const { message } = defineProps<{
  message: string;
}>();
</script>

<style scoped>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
