<template>
<!-- 面包屑组件 el-breadcrumb -->

<!-- separator属性 是分隔符 -->
<el-breadcrumb separator=">">
    <!-- :to 跳转的地址 和router-link中的to一样 -->
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <!-- 第二个是动态的内容 需要采用传值的方式传进来  一种是props传值 一种是slot -->
  <el-breadcrumb-item>
    <!-- 定义一个具名插槽 -->
    <slot name="title"></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
