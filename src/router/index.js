import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 简写方式 相当于 '@/views/home/index.vue' 其中@是/src的别名
import Login from '@/views/login' // 简写方式
import SecondHome from '@/views/home/second_home'// 二级路由组件
// import Comment from '@/views/home/comment'// 二级路由组件 评论列表
Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 匹配任何找不到组件的路由
    component: () => import('@/views/404.vue')
  },
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
    },
    {
      path: '/home/comment', // 评论列表地址 完整地址
      component: () => import('@/views/comment') // 按需加载
    },
    {
      path: '/home/material', // 素材管理地址 完整地址  'material' (简写地址)
      component: () => import('@/views/material') // 按需加载
    },
    {
      path: 'articles', // 内容列表 简写地址
      component: () => import('@/views/articles') // 引入组件 按需加载
    },
    {
      path: 'publish/:articleId?', // 发布文章 简写地址 传递参数因为要修改文章 加？表示不管传不传参数都可以跳到publish页
      component: () => import('@/views/publish') // 引入组件 按需加载
    },
    {
      path: 'account', // 账户信息 简写地址
      component: () => import('@/views/account') // 引入组件 按需加载
    },
    {
      path: 'picture', // 粉丝列表 图文数据
      component: () => import('@/views/picture-echart') // 引入组件
    }
    ]
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
