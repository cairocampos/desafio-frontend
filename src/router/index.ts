import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/core/pages/home/Home.vue'
import Watch from '@/core/pages/watch/Watch.vue'

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Watch",
    path: "/watch",
    component: Watch
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})



export {
  router,
  routes
}