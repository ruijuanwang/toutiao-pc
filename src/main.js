import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import ElementUI from 'element-ui' // 引入模块
import axios from 'axios' // 引入axios
import Components from '@/components' // 引入自定义组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式
Vue.use(Components) // 注册开发自定义组件
Vue.use(ElementUI) // 全局注册element-ui 框架 一旦全局注册 所有的位置都可以使用组件
// Vue.use实际上 会调用 ElementUI对象里的一个方法 install方法 并且传入当前的Vue对象
Vue.config.productionTip = false
// 配置axios的baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
Vue.prototype.$axios = axios // 将axios赋值给Vue对象的原型属性

new Vue({
  router, // es6 挂载路由
  render: h => h(App)
}).$mount('#app')
