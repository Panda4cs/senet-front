import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/ttt",
    name: "Tic-tac-toe",
    component: () => import("../views/Tic-tac-toe.vue"),
  },
  {
    path: "/waitingOpponent",
    name: "waiting",
    component: () => import("../views/Waiting.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
