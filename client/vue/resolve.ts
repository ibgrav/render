import { defineAsyncComponent } from "vue";
import { vueComponents } from "../../server/components/vue";

export const glob = import.meta.glob("./components/**/*.vue");

export const getComponent = (name: string) => {
  const path = vueComponents[name];
  if (path) {
    const importFn = glob[`./${path}`];
    if (importFn) {
      return defineAsyncComponent(importFn);
    }
  }
  return undefined;
};
