export const ext = "";

declare global {
  interface Window {
    __VUE_APPS__: HBS.VueApp[];
    __APP_SCRIPTS__: HBS.AppScript[];
  }
}
