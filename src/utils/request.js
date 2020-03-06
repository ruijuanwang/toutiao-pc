/**
 * 封装请求工具 request.js
 * 对axios的二次封装
 * 配置拦截器以及其他
 *
 */

// 1.先要引入axios
import axios from 'axios'
import router from '@/router' // 路由实例对象
import JSONBig from 'json-bigint' // 引入处理大数字的包
// 对axios的返回数据进行了自定义处理 用json-biginit 替代原来的json
// transformResponse 是请求回来的字符串转换成 对象的入口 在这个位置 如果处理了 相当于所有的接口都处理了大数字
axios.defaults.transformResponse = [function (data) {
// data 参数是后端响应回来的字符串  我们要对data进行处理 转换成对象 进行返回
// 这里主要处理 id 超过大数字的时候 转化不正确的问题 使用第三方包解决  JSONBig.parse
// 转化之前先判断 后端有没有返回 data 数据 如果为空就不用转化
// debugger
  return data ? JSONBig.parse(data) : {}
}]
// 2.拦截器及其他操作
// 2.1配置axios的baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 2.2请求拦截器的开发
axios.interceptors.request.use(function (config) {
  // 成功时执行 第一个回调函数
//   第一个参数会有一个config config就是所有axios的请求信息
// 在第一个函数中 需要将配置进行返回  返回的配置 会作为请求参数发送服务器 进行请求
// 在返回之前 我们要统一注入token 因为每次请求 几乎都有token
  const token = window.localStorage.getItem('user-token') // 获取缓存中的token 取钥匙
  config.headers.Authorization = `Bearer ${token}`// 统一注入token 请求格式是Bearer加token
  return config // 必须有返回值
}, function (errow) {
  // 失败时执行 第二个回调函数
//   失败时 会有一个错误 直接reject即可
// axios是支持promise的 如果失败 我们应该直接reject  reject会直接进如到axios的catch中
  return Promise.reject(errow)
})

// 2.3 响应拦截开发
axios.interceptors.response.use(function (response) {
  // 成功执行第一个回调
  // 回调函数的第一个参数 是响应体
//   在拦截器中需要将数据 返回给浏览器 可以将数据进行结构  response.data.data  真正的数据
  return response.data ? response.data : {} // 有接口数据 返回data中的数据 没有返回一个空对象（有的接口没有任何响应数据）
}, function (error) {
  // 失败执行第二个回调
// error是错误对象 里面包含了错误的状态码 和 响应的信息
// 401 状态码 表示用户认证失败 用户身份不对
// 401出现的时候 表示拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对...
// 之前的导航守卫 校验有没有token
// 应该换一个新钥匙 这里使用粗暴方式换钥匙
// 回登录页之前 应该把钥匙清除掉
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除钥匙
    router.push('/login') // 直接导入路由对象 使用编程式导航跳转 和组件中的this.$router是一样的
    // 跳回到登录页
    // 这里不能使用this.$router.push('/login') 因为this不是组件实例
  }
})

// 3.导出
export default axios
