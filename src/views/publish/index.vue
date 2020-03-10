<template>
  <!-- 发布文章组件 -->
<el-card>
    <!-- 面包屑组件 具名插槽 作为el-card的插槽内容来显示 -->
    <bread-crumb slot="header">
     <template slot="title">发布文章</template>
    </bread-crumb>
<!-- 表单容器  label标题的宽度在el-form组件写 label-width 属性-->
<!-- :model绑定要校验的数据对象  :rules 当前数据的校验规则  props 绑定要校验的字段 -->
<el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">
<el-form-item label="标题：" prop="title">
    <!-- 输入框 -->
    <el-input v-model="publishForm.title" style="width:60%" placeholder="请输入标题"></el-input>
</el-form-item>
<el-form-item label="内容：" prop="content">
    <!-- 多行输入  将input换成quill-editor即可-->
     <quill-editor v-model="publishForm.content" style="width:100%;height:300px"></quill-editor>
</el-form-item>
<el-form-item label="封面：" prop="cover">
    <!-- 单选框组 -->
    <!-- 封面单选组 绑定的是 封面cover中的type -->
    <!-- 绑定change事件 监听type变化 来决定images中的长度变化  -->
    <el-radio-group @change="changeType" v-model="publishForm.cover.type" style="margin-top:120px">
        <!-- 给每el-radio加上 :label属性 用来显示type的值 -->
        <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
    </el-radio-group>
</el-form-item>
<el-form-item label="频道：" prop="channel_id">
    <!-- 下拉菜单 用 select选择器 -->
    <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
    <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
        <!-- 下拉菜单 用v-for循环生成el-option  label 显示值  value 保存值 -->
        <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id" ></el-option>
    </el-select>
</el-form-item>
<el-form-item>
    <!-- 两个按钮  -->
    <!--  false 发布文章 true存入草稿  -->
    <el-button @click="publish(false)" type="success">发表</el-button>
    <el-button  @click="publish(true)" type="info">存入草稿</el-button>
</el-form-item>
</el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 发布表单数据 校验的数据对象
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 字符串的数组 对用type  如果type为 1 images中应该有1个值-type为 3 images中应该有3个值 0为空
        },
        channel_id: null // 频道id

      },
      // 发布表单校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, { min: 5, max: 30, message: '文章标题应该在5-30之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]

      },
      // 接收频道数据
      channels: [] // 为什么用数组接收 因为接口取过来的是个数组 里面的每一项是个对象
    }
  },
  methods: {
    // 改变封面图片类型的事件
    changeType () {
    //  封面类型 -1:自动，0-无图，1-1张，3-3张
    // 应该根据type值的变化 来控制images进行控制
      if (this.publishForm.type === 1) {
        this.publishForm.images = [''] // 此时还没有选择图片 所以给1个空字符串
      } else if (this.publishForm.type === 3) {
        this.publishForm.images = ['', '', ''] // 此时还没有选择图片 所以给3个空字符串
      } else {
        this.publishForm.images = [] // 无图或者自动式 给一个空数组
      }
    },
    // 获取文章频道 方法
    getChannels () {
      // 调用接口
      this.$axios({
        url: '/channels' // 接口地址
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    // 发表按钮方法
    // 通过有无id 判断当前文章是修改还是发布
    publish (draft) {
      // 手动校验 通过this.$refs.myForm获取表单组件实例 调用validate方法
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params // 如果id 不为空 就是修改 如果为空就是发布新文章
        // 一个接口干了四件事
        //  发布正式文章 发布草稿文章
        //  修改正式文章 修改草稿文章
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles', // 根据场景决定什么地址
          method: articleId ? 'put' : 'post', // 根据场景决定什么类型
          params: { draft }, // query参数(是个对象) es6
          data: this.publishForm // body传参 表单信息

        }).then(() => {
          // 表示发表成功 回内容列表页
          this.$router.push('/home/articles')
          this.$message.success('操作成功')
        }).catch(() => {
          this.$message.error('操作失败')
        })
        // if (articleId) {
        // // 调用修改接口
        //   this.$axios({
        //     url: `/articles/${articleId}`, // 地址
        //     method: 'put',
        //     params: { draft }, // query参数(是个对象) es6
        //     data: this.publishForm // body传参 表单信息

        //   }).then(() => {
        //     // 表示发表成功 回内容列表页
        //     this.$router.push('/home/articles')
        //     this.$message.success('操作成功')
        //   }).catch(() => {
        //     this.$message.error('操作失败')
        //   })
        // } else {
        //   //   表示校验成功  调用发表文章的接口
        // // 存入草稿和发表文章可以调用一个接口 根据draft参数来区分 draft表示是否存入草稿  true存入草稿  false发布文章
        //   this.$axios({
        //     url: '/articles', // 地址
        //     method: 'post',
        //     params: { draft }, // query参数(是个对象) es6
        //     data: this.publishForm // body传参 表单信息
        //   }).then(() => {
        //   // 表示发表成功 回内容列表页
        //     this.$router.push('/home/articles')
        //     this.$message.success('操作成功')
        //   }).catch(() => {
        //     this.$message.error('操作失败')
        //   })
        // }
      })
    },

    //  根据id获取要修改的文章内容 显示页面
    getArticleById (id) {
      //   调用接口
      this.$axios({
        url: `articles/${id}` // 地址
      }).then((result) => {
        this.publishForm = result.data // 赋值到data表单数据中
      })
    }
  },
  created () {
    this.getChannels() // 获取文章频道
    const { articleId } = this.$route.params // articleId是 路由参数中定义的
    articleId && this.getArticleById(articleId) // && 运算符 前面为true 后面才执行 调用获取 文章详情内容方法
  }
}
</script>

<style>

</style>
