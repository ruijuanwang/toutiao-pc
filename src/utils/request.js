/**
 * 封装请求工具 request.js
 * 对axios的二次封装
 * 配置拦截器以及其他
 *
 */

// 1.先要引入axios
import axios from 'axios'

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
}, function () {
  // 失败执行第二个回调

})

// 3.导出
export default axios
