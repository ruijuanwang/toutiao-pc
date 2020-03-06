<template>
<!--素材管理 二级路由组件  -->

<!--el-card组件布局 想显示header部分要有显式具名 slot -->
  <el-card>
    <!-- 将面包屑给到 el-card的 具名插槽header  -->
    <bread-crumb slot="header">
    <!-- 面包屑组件 具名插槽 -->
    <template slot="title">素材管理</template>
  </bread-crumb>
  <!-- tab标签组件 tab-click  -->
 <!--  v-model="activeName" 绑定的值，就是所激活的页签  选项卡的 name -->
  <el-tabs v-model="activeName" type="boder-card">
    <el-tab-pane label="全部" name="all" >全部素材</el-tab-pane>
    <el-tab-pane label="收藏" name="collect">收藏素材</el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all' // 当前激活的页签 默认all全部
    }
  }
}
</script>

<style>

</style>
