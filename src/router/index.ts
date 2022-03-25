import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routerList from '@/util/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'Main',
    component: () => import("../views/main/Main.vue"),
    children: [...routerList]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/login/Login.vue"),
    // children: [...routerList]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
