import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/util/cache'
import { dynamicAddRoute } from '@/util/routes'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import("../views/main/Main.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue")
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    //判断是否登录
    if (!localCache.getCache('token')) {
      next({ path: '/login' })
    }
    //每次刷新浏览器需要重新加入动态路由
    if (store.state.isFlush) {
      //这里一定要将isFlush取反，避免死循环
      store.state.isFlush = false;
      const routes = dynamicAddRoute();
      for (const route of routes) {
        router.addRoute(route)
      }
      // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
      next({ ...to, replace: true })
    } else {
      //加载过动态路由直接放行
      next()
    }
  } else {
    //对login页面放行
    next()
  }
})
export default router
