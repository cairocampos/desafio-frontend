import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/core/pages/home/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export {
  router
}