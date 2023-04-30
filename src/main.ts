import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./pinia";
import { getInfo } from "./services/api";
import { useAuthStore } from "./store/auth";

const app = createApp(App).use(pinia).use(router);

const getUserInfo = () => {
  return new Promise((resolve) => {
    try {
      const user = getInfo();
      useAuthStore().setUser(user);
    } catch (err) {
      console.warn(err);
    }
    resolve(true);
  });
};

getUserInfo().then(() => app.mount("#app"));
