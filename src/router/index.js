import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 简写方式 相当于 '@/views/home/index.vue' 其中@是/src的别名

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
  // {
  // // 按需加载 访问的时候 才进行js请求 否则不请求
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
