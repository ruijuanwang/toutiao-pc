<template>
<!-- 头部组件 -->
    <!-- 栅格布局 24份 el-row: 行 el-col： 列-->
    <!-- 一行分两列 一列占12份 -->
  <el-row class="layout-header" type="flex" align="middle">
      <!-- 左侧 -->
     <el-col :span="12" class="left">
         <!-- 字体图标  第一个箭头向左 还没折叠-->
         <!-- class为动态图标 -->
         <!-- ：class="{ class名称:布尔值,class名称:布尔值 }" -->
         <i @click="collapse=!collapse" :class="{'el-icon-s-fold':!collapse,'el-icon-s-unfold':collapse}"></i>

        <span> 更多新闻关注今日头条</span>
     </el-col>
     <!-- 音频标签 -->
  <audio style="width:260px;height:40px;margin:10px" src='../../assets/img/music.mp3' loop='loop' controls='cotrols'  autoplay='autoplay'></audio>

     <!-- 右侧 -->
     <el-col :span="12" class="right">
         <!-- 再放一个el-row组件 type="flex" 开启flex布局 justify 设置对齐样式 align属性设置垂直对齐方式-->
        <el-row type="flex" justify="end" align="middle">
            <!-- 头像图片 -->
           <img :src="userInfo.photo" alt="">
            <!-- 下拉菜单  用el-dropdown 标签组件  trigger属性：触发下拉的行为 click或hover-->
            <!-- 点击菜单会触发clickMenu事件 -->
            <el-dropdown @command="clickMenu" trigger='click' :hide-on-click="false">
                   <!-- 昵称 -->
                   <span  class="click">{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                <el-dropdown-item command='git'>git地址</el-dropdown-item>
                <el-dropdown-item divided command='lgout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </el-row>
     </el-col>

</el-row>

</template>

<script>
import eventBus from '@/utils/eventBus' // 公共领域监听
export default {
  data () {
    return {
      userInfo: {}, // 用户个人信息
      collapse: false // 开始不是折叠的
    }
  },
  methods: {
    clickMenu (command) {
      // 三种情况
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/ruijuanwang/toutiao-pc'
      } else {
        //   点击了退出 1.删除token 2.跳转登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')// 编程式导航 跳回登录页
      }
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile' // 请求地址
      }).then(result => {
        //   console.log(result.data)
        // 加载成功 把数据赋值给userInfo
        this.userInfo = result.data
      })
    }

  },
  created () {
    this.getUserInfo() // 页面初始化 获取数据 正常加载
    // 触发监听事件
    eventBus.$on('updateUser', () => {
      // updateUser 这个事件  就会执行回调函数  (修改用户个人信息 点击保存的时候就会出发这个事件 还有头像)
      this.getUserInfo() // 重新获取用户信息
    })
  },
  watch: {
    // 监听data中的数据变化
    collapse () {
      // 此时说明 折叠状态变了 通知左侧导航组件
      eventBus.$emit('changeCollapse') // 触发一个改变折叠状态的事件
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header{
    height: 60px;
    .left{
    i {
        font-size: 20px;
    }
    span{
        font-size: 20px;
    }
}
  .right{
     img{
        width: 40px;
        height:40px;
        border-radius: 50%;
        margin-right:5px;

    }
    .click{
        cursor: pointer;
    }
}

}

</style>
