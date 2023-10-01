import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./pinia";

const app = createApp(App).use(pinia).use(router);
app.mount("#app");
