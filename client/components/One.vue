<template>
  <div>Vue Component One</div>
  <pre>{{ JSON.stringify({ props }, null, 2) }}</pre>
</template>

<script setup lang="ts">
const props = defineProps({ message: String });
</script>
