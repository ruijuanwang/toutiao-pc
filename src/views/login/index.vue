<template>
<!-- 登录页面 -->
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
    <!-- 表单内容 -->
    <!-- 头部logo部分 -->
    <div class="title">
      <img src="../../assets/img/login_logo.png" alt="">
    </div>
  <!-- 表单容器 el-form -->
    <el-form >
  <!-- 每一个表单域由form-item组件构成 表单域里面放置 input/select/checkbox -->
       <!-- 表单域-->
       <el-form-item>
           <!-- 手机号  -->
           <el-input placeholder="请输入手机号"></el-input>
       </el-form-item>
       <!-- 表单域-->
        <el-form-item>
           <!-- 验证码  -->
           <el-input placeholder="请输入验证码" style="width:60%"></el-input>
           <!-- 按钮 -->
           <el-button  type="primary" style="float:right">发送验证码</el-button>
       </el-form-item>
       <!-- 表单域 -->
       <el-form-item>
           <!-- 复选框 是否同意协议 -->
           <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <!-- 表单域 -->
       <el-form-item>
           <!-- 按钮 -->
           <el-button  type="primary" style="width:100%">同意</el-button>
       </el-form-item>
    </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
// 如果需要写less 要在style标签中 写lang='less'
// 加了scoped属性 就只会对当前自己的页面组件起作用
.login{
  // flex布局要写给父元素
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh; // 当前屏幕可视区域分成100份 100vh就是当前屏幕的100%

    //毛玻璃
    &:before{
      content:'';
       position: absolute;
       width: 100%;
       height: 100%;
       background: url('../../assets/img/login_bg2.jpg') no-repeat;
       background-size: cover;
       filter: blur(5px)

}
    // 表单
    .login-card{
     position:absolute;
      width: 440px;
      height: 340px;
      background: rgba(0,0,0,0);

    }
    .title{
      text-align: center;
      height: 60px;
      img{
        width: 150px;
        height: 30px;
      }

    }
}
</style>
