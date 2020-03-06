<template>
<!--素材管理 二级路由组件  -->

<!--el-card组件布局 想显示header部分要有显式具名 slot -->
  <el-card>
    <!-- 将面包屑给到 el-card的 具名插槽header  -->
    <bread-crumb slot="header">
    <!-- 面包屑组件 具名插槽 -->
    <template slot="title">素材管理</template>
  </bread-crumb>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
