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
    <!-- 多行输入 -->
     <el-input v-model="publishForm.content" type="textarea" :rows="5" style="width:60%"></el-input>
</el-form-item>
<el-form-item label="封面：" prop="cover">
    <!-- 单选框组 -->
    <!-- 封面单选组 绑定的是 封面cover中的type -->
    <el-radio-group v-model="publishForm.cover.type">
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
    <el-button @click="publish" type="success">发表</el-button>
    <el-button type="info">存入草稿</el-button>
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
    publish () {
      // 手动校验 通过this.$refs.myForm获取表单组件实例 调用validate方法
      this.$refs.myForm.validate()
    }
  },
  created () {
    this.getChannels() // 获取文章频道
  }
}
</script>

<style>

</style>
