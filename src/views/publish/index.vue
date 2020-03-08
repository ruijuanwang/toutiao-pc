<template>
  <!-- 发布文章组件 -->
<el-card>
    <!-- 面包屑组件 具名插槽 作为el-card的插槽内容来显示 -->
    <bread-crumb slot="header">
     <template slot="title">发布文章</template>
    </bread-crumb>
<!-- 表单容器  label标题的宽度在el-form组件写 label-width 属性-->
<el-form style="margin-left:50px" label-width="100px">
<el-form-item label="标题：">
    <!-- 输入框 -->
    <el-input style="width:60%" placeholder="请输入标题"></el-input>
</el-form-item>
<el-form-item label="内容：">
    <!-- 多行输入 -->
     <el-input type="textarea" :rows="5" style="width:60%"></el-input>
</el-form-item>
<el-form-item label="封面：">
    <!-- 单选框组 -->
    <el-radio-group>
        <el-radio>单图</el-radio>
        <el-radio>三图</el-radio>
        <el-radio>无图</el-radio>
        <el-radio>自动</el-radio>
    </el-radio-group>
</el-form-item>
<el-form-item label="频道：">
    <!-- 下拉菜单 用 select选择器 -->
    <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
    <el-select placeholder="请选择频道">
        <!-- 下拉菜单 用v-for循环生成el-option  label 显示值  value 保存值 -->
        <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id" ></el-option>
    </el-select>
</el-form-item>
<el-form-item>
    <!-- 两个按钮  -->
    <el-button type="success">发表</el-button>
    <el-button type="info">存入草稿</el-button>
</el-form-item>
</el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 接收频道数据 为什么用数组接收 因为接口取过来的是个数组 里面的每一项是个对象
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
    }
  },
  created () {
    this.getChannels() // 获取文章频道
  }
}
</script>

<style>

</style>
