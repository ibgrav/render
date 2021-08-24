import { createApp } from "vue";
import App from "./App.vue";

const appOpts = window.SS_VUE_APPS || [];

appOpts.forEach(({ id, name, props }) => {
  createApp(App, { name, props }).mount(`#${id}`);
});
