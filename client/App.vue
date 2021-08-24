<template>
  <h2 id="app">Vue!</h2>
  <component v-if="Boolean(components[name])" :is="components[name]" v-bind="props" />
  <component v-else :is="components['missing']" :name="name" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const { name, props } = defineProps({
  name: String,
  props: {},
});

const components = {
  missing: defineAsyncComponent(() => import("./components/Missing.vue")),
  one: defineAsyncComponent(() => import("./components/One.vue")),
  two: defineAsyncComponent(() => import("./components/Two.vue")),
  three: defineAsyncComponent(() => import("./components/Three.vue")),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #315b85;
  margin-top: 60px;
}
</style>
