<template>
<!-- 主页 -->
<!-- 最外层放置一个大容器 el-container组件-->
<el-container>
    <!-- el-aside侧边栏容器 -->
    <!-- 根据折叠状态变成64px -->
    <el-aside :style="{width:collapse ? '64px':  '230px'}" style="background-color:#2e2f32; transition:all 0.5s">
        <!-- 左侧导航组件 -->
        <!-- 把父组件的状态传给子组件 -->
     <layout-aside :collapse='collapse'></layout-aside>
    </el-aside>
    <!-- 右边在嵌套一个外层的大容器 -->
    <el-container>
        <!-- 再上下布局 -->
        <el-header style="background:rgba(214,207,214,.2)">
            <!-- 头部组件 -->
            <layout-header></layout-header>
        </el-header>
        <!-- 主要区域 默认加了20px的内边距-->
        <el-main style="padding: 0">
            <!-- 这里应该放置二级路由容器 -->
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>

</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认是展开状态
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      // 此时表示 状态一定变了 跟之前状态相反
      this.collapse = !this.collapse // 只要取反 就和头部组件的状态对上
    })
  }

}
</script>

<style>

</style>
