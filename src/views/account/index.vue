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
            <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介：'>
            <el-input style="width:30%" type="textear" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label='邮箱：'>
            <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='手机号：'>
            <!-- 手机号不能被修改 手机号是登录的标识 -->
            <el-input disabled style="width:30%"></el-input>
        </el-form-item>
         <el-form-item>
             <!-- 保存按钮 -->
         <el-button type='primary'>保存</el-button>
       </el-form-item>
      </el-form>
      <!-- 头像 -->
      <div class="head-upload">
          <img src="../../assets/img/login_bg.jpg" alt="">
      </div>
  </el-card>
</template>

<script>
export default {

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
