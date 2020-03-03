<template>
<!-- 主页 -->
<!-- 最外层放置一个大容器 el-container组件-->
<el-container>
    <!-- el-aside侧边栏容器 -->
    <el-aside>
        <!-- 左侧导航组件 -->
     <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边在嵌套一个外层的大容器 -->
    <el-container>
        <!-- 再上下布局 -->
        <el-header>头部</el-header>
        <!-- 主要区域 -->
        <el-main>
            主体
            <!-- 这里应该放置二级路由容器 -->
            <router-view>s</router-view>
        </el-main>
    </el-container>
</el-container>

</template>

<script>
// 引入左侧导航组件注册并且使用
import LayoutAside from '@/components/home/layout-aside'

export default {
  components: {
    'layout-aside': LayoutAside// 注册左侧导航组件
  }

}
</script>

<style>

</style>
