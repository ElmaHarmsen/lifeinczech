import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    mobile: 400,
    tablet: 768,
    desktop: Infinity
  }
});
