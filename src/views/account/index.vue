<template>
<!-- 账户信息组件 -->
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
     <template slot="title"> 账户信息</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form label-width="100px">
          <!-- 表单域 -->
        <el-form-item label='用户名：'>
            <el-input v-model="formdata.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介：'>
            <el-input  v-model="formdata.intro" style="width:30%" type="textear" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label='邮箱：'>
            <el-input  v-model="formdata.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='手机号：'>
            <!-- 手机号不能被修改 手机号是登录的标识 -->
            <el-input  v-model="formdata.mobile" disabled style="width:30%"></el-input>
        </el-form-item>
         <el-form-item>
             <!-- 保存按钮 -->
         <el-button type='primary'>保存</el-button>
       </el-form-item>
      </el-form>
      <!-- 头像 -->
      <div  class="head-upload">
          <img src="../../assets/img/login_bg.jpg" alt="">
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收表单数据
      formdata: {
        name: '', // 用户名
        intro: '', // 头条号简介
        photo: '', // 用户头像
        email: '', // 邮箱
        mobile: '' // 手机号
      }
    }
  },
  methods: {
    //   获取用户信息
    getUserInfo () {
      // 调用接口
      this.$axios({
        url: '/user/profile' // 地址
      }).then(result => {
        //   成功
        this.formdata = result.data // 赋值给表单对象数据
      })
    }
  },
  created () {
    this.getUserInfo() // 获取用户信息
  }

}
</script>

<style lang='less' scoped>
.head-upload {
  position: absolute;
  right: 350px;
  top:160px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  img{
      width: 100%;
      height: 100%;
  }
}

</style>
