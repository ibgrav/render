import { createApp } from "vue";
import App from "./App.vue";

export interface SS_VUE_APP {
  id: string;
  name: string;
  props?: Record<string, any>;
}

declare global {
  interface Window {
    SS_VUE_APPS: SS_VUE_APP[];
  }
}

const apps = window.SS_VUE_APPS || [];

createApp(App, { apps }).mount(`#vue-main`);
