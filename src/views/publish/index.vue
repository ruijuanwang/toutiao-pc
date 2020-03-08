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
    <el-select></el-select>
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

}
</script>

<style>

</style>
