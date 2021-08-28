import { scriptComponents } from "../../server/components/scripts";

export const glob = import.meta.glob("./**/*.ts");

const appScripts = window.__APP_SCRIPTS__ || [];

appScripts.forEach(({ name, args = [] }) => {
  const path = scriptComponents[name];
  if (path) {
    const importFn = glob[`./${path}`];
    if (importFn) {
      return importFn().then((mod) => mod.default(...args));
    }
  }
  return undefined;
});
