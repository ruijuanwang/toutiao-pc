import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 简写方式 相当于 '@/views/home/index.vue' 其中@是/src的别名
import Login from '@/views/login' // 简写方式
import SecondHome from '@/views/home/second_home'// 二级路由组件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级路由表写在一级路由表的children下
    children: [{ // 二级路由地址如果不写/代表和一级路由地址拼接 如果写/表示完整的地址
      path: '', // 二级路由的path 什么都不写 代表二级路由的默认组件 ==>'/home'
      component: SecondHome // 默认的二级路由组件
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login// 路由级组件
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
