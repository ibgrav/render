<template>
  <h2 id="app">Vue!</h2>
  <teleport v-for="{ id, name, props } in apps" :key="id" :to="`#${id}`">
    <component v-if="Boolean(getComponent(name))" :is="getComponent(name)" v-bind="props" />
    <component v-else :is="getComponent('missing')" :name="name" />
  </teleport>
</template>

<script setup lang="ts">
import type { SS_VUE_APP } from "./main";
import { getComponent } from "./resolve";

const { apps } = defineProps<{ apps: SS_VUE_APP[] }>();
console.log({ apps });
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
