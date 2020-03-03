// 专门处理路由权限问题
import router from '@/router'
// 注册全局守卫
// 回调会在路由发生改变之前执行
// next()有三种场景

router.beforeEach(function (to, from, next) {
  // next()表示放过
  // 首先应该判断 需要拦截哪些页面  如果页面的地址 以 /home 开头,就需要进行token的判断
  // 判断你要去的页面是不是以 /home开头
  if (to.path.startsWith('/home')) {
    // 表示要去主页相关的地方 判断有没有token钥匙 有放行 没有 回登录页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login')// 没有token去登录页
    }
  } else {
    next() // 不是去主页相关 直接放过
  }
})
