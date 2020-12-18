import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "@/store/index";

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
    path: "/elma",
    name: "Elma",
    component: () => import("../views/ListElma.vue")
  },
  {
    path: "/vitek",
    name: "Vítek",
    component: () => import("../views/ListVitek.vue")
  },
  {
    path: "/search",
    name: "SearchResult",
    component: () => import("../views/SearchResult.vue")
  },
  {
    path: "/whyducky",
    name: "WhyDucky",
    component: () => import("../views/WhyDucky.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//Routeguard: if the name of the route is not login, it will redirect to the login view
router.beforeEach(async (to, from, next) => {
  console.log(to.name);
  if (to.name === "Login") return next();
  console.log("Checking session now");
  let isSessionValid = Store.state.validSession;
  console.log("Valid before request: ", isSessionValid); // When the session is valid before the request, no request is made
  if (!Store.state.validSession) await Store.dispatch("firstToFire");
  isSessionValid = Store.state.validSession;
  console.log("Valid after request: ", isSessionValid);
  if (!isSessionValid) return next({ name: "Login" });
  else return next();
});

export default router;
