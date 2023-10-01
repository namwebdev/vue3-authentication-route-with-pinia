import { createPinia } from "pinia";
import router from "./router";
import { Router } from "vue-router";
import { markRaw } from "vue";

export const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);

  store.$onAction(({ store, name, args, after, onError }) => {
    // console.log("onAction: ", store, name, args);

    after((result) => {
      // console.log("pinia after action ", store);
    });

    onError((error) => {
      console.error("pinia action error ", error);
    });
  });
});

declare module "pinia" {
  interface PiniaCustomProperties {
    router: Router;
  }
}
