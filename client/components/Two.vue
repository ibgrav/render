<template>
  <div>Vue Component Two</div>
  <pre>{{ JSON.stringify({ props }, null, 2) }}</pre>
</template>

<script setup>
const props = defineProps({ message: String });
</script>
