import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: () => import("../views/Dictionary.vue")
  },
  {
    path: "/search",
    name: "SearchResult",
    component: () => import("../views/SearchResult.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
