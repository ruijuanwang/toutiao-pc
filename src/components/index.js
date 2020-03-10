// 这个文件是专门放公共的组件注册

// Vue.use会调用对象中的方法 install方法 第一个参数是Vue对象
// 引入组件
import LayoutAside from './home/layout-aside'// 侧边栏组件
import LayoutHeader from './home/layout-header'// 头部组件
import BreadCrumb from './common/bread-crumb' // 面包屑组件
import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import CoverImage from './publish/cover-image' // 封面图片组件
import SelectImage from './publish/select-image' // 封面图片上传并选择图片组件

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    //   注册全局组件  Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-aside', LayoutAside)// 注册头部组件
    Vue.component('layout-header', LayoutHeader)// 注册左侧导航组件
    Vue.component('bread-crumb', BreadCrumb)// 注册面包屑组件
    Vue.use(VueQuillEditor)// 注册富文本编辑器
    Vue.component('cover-image', CoverImage) // 注册封面图片组件
    Vue.component('select-image', SelectImage) // 注册封面 选择并且上传的图片组件
  }
}
