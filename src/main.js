import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import mq from "./plugins/mq";
import "./assets/reset.css";
import "./assets/fonts.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mq,
  render: h => h(App)
}).$mount("#app");
