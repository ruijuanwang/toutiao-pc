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
  <!-- 绑定:model属性  绑定:rules属性（表单验证规则） -->
    <el-form :model='loginForm' :rules='loginRules'>
  <!-- 每一个表单域由form-item组件构成 表单域里面放置 input/select/checkbox -->
       <!-- 表单域-->
       <!-- 表单域中 设置 prop属性表示要校验的字段名 -->
       <el-form-item prop="mobile">
           <!-- 手机号  -->
           <!-- v-model ： 和data中的数据进行 双向绑定 -->
           <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
       </el-form-item>
       <!-- 表单域-->
        <el-form-item prop="code">
           <!-- 验证码  -->
           <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:60%"></el-input>
           <!-- 按钮 -->
           <el-button  type="primary" style="float:right">发送验证码</el-button>
       </el-form-item>
       <!-- 表单域 -->
       <el-form-item prop="checked">
           <!-- 复选框 是否同意协议 -->
           <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
  data () {
    return {
      // 1.登录表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false// 是否同意同户协议

      },
      // 2.定义表单的验证规则
      loginRules: {
        // required ：如果为true表示该字段必须填
        mobile: [{
          required: true, message: '您的手机号不能为空'
        }, {
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '您的手机号格式不正确' //
        }],
        code: [{
          required: true, message: '您的验证码不能为空'
        }, {
          pattern: /^\d{6}$/, // 正则表达式 要求6个数字
          message: '验证码必须是6位数字'
        }],
        checked: [{
          validator: function (rule, value, callback) {
            // rule是当前效验的规则
            // value是当前效验的字段值
            // callback是一个回调函数 验证成功或者失败都会执行
            // 成功执行callback 失败执行callback(new Errow('错误信息'))
            // checked字段中 value为true就表示效验成功 如果value为false则表示效验失败
            // new Error('错误信息') 就是提示我们当前的错误信息
            value ? callback() : callback(new Error('请同意此协议'))
          }
        }]

      }

    }
  }
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
