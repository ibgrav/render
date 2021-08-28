<template>
  <teleport v-for="{ id, name, props } in apps" :key="id" :to="`#${id}`">
    <Suspense>
      <template #default>
        <component v-if="Boolean(getComponent(name))" :is="getComponent(name)" v-bind="props" />
        <component v-else :is="getComponent('missing')" :name="name" />
      </template>
      <template #fallback>
        <component :is="getComponent('missing')" :name="name" />
      </template>
    </Suspense>
  </teleport>
</template>

<script setup lang="ts">
import { getComponent } from "./resolve";

const { apps } = defineProps<{ apps: HBS.VueApp[] }>();
</script>
