import { createApp } from "vue";
import App from "./App.vue";

const apps = window.__VUE_APPS__ || [];

createApp(App, { apps }).mount(`#vue-main`);
