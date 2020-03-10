<template>
<!-- 账户信息组件 -->
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
     <template slot="title"> 账户信息</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
          <!-- 表单域 -->
        <el-form-item prop="name" label='用户名：'>
            <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='简介：'>
            <el-input  v-model="formData.intro" style="width:30%" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item prop="email" label='邮箱：'>
            <el-input  v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label='手机号：'>
            <!-- 手机号不能被修改 手机号是登录的标识 -->
            <el-input  v-model="formData.mobile" disabled style="width:30%"></el-input>
        </el-form-item>
         <el-form-item>
             <!-- 保存按钮 -->
         <el-button @click="saveUser" type='primary'>保存</el-button>
       </el-form-item>
      </el-form>
      <!-- 头像 -->
        <!-- show-file-list为false  不显示上传的文件列表 -->
     <el-upload action="" :http-request="uploadImg" :show-file-list="false" class='head-upload'>
            <img :src="formData.photo? formData.photo : defaultImg" alt="">
     </el-upload>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收表单数据
      formData: {
        name: '', // 用户名
        intro: '', // 头条号简介
        photo: '', // 用户头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      //   表单检验
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }]
      },
      //   默认头像
      defaultImg: require('../../assets/img/login_bg.jpg') // 头像变量
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
        this.formData = result.data // 赋值给表单对象数据
      })
    },
    // 保存用户信息 手动校验
    saveUser () {
    //    获取表单组件对象 调用validate()手动检验方法
      this.$refs.myForm.validate().then(() => {
        // 进入then 说明校验成功
        // 调用接口
        this.$axios({
          url: '/user/profile', // 地址
          method: 'patch', // 类型
          data: this.formData
        }).then(result => {
          // 修改成功
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    },
    // 点击上传头像
    uploadImg (params) {
      // params.file 上传的文件地址
    //   调用接口 formdata类型
      var data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo', // 地址
        method: 'patch',
        data // es6写法

      }).then((result) => {
        this.formData.photo = result.data.photo // 接口返回的图片新地址 赋值给photo变量
        this.$message.success('用户头像上传成功')
      }).catch(() => {
        this.$message.error('用户头像上传失败')
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
