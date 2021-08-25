import { defineAsyncComponent } from "vue";
import { vueComponents } from "../server/components/vue";

// export const components: Record<string, string> = {
//   missing: "Missing.vue",
//   one: "One.vue",
//   two: "Two.vue",
//   three: "Three.vue",
// };

export const glob = import.meta.glob("./components/**/*.vue");

export const getComponent = (name: string) => {
  const path = vueComponents[name];
  if (path) {
    const importFn = glob[`./components/${path}`];
    if (importFn) {
      return defineAsyncComponent(importFn);
    }
  }
  return undefined;
};

// export const resolveComponent = (name: string) => {
//   const path = components[name];
//   if (name) return defineAsyncComponent(() => import(`./components/${name}`));
// };

// export const componentImports: Record<string, ReturnType<typeof defineAsyncComponent>> = {
//   missing: defineAsyncComponent(() => import("./components/Missing.vue")),
//   one: defineAsyncComponent(() => import("./components/One.vue")),
//   two: defineAsyncComponent(() => import("./components/Two.vue")),
//   three: defineAsyncComponent(() => import("./components/Three.vue")),
// };
