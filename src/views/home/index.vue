<template>
<!-- 主页 -->
<!-- 最外层放置一个大容器 el-container组件-->
<el-container>
    <!-- el-aside侧边栏容器 -->
    <el-aside style="width:230px; background-color:#2e2f32">
        <!-- 左侧导航组件 -->
     <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边在嵌套一个外层的大容器 -->
    <el-container>
        <!-- 再上下布局 -->
        <el-header>
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

export default {

}
</script>

<style>

</style>
