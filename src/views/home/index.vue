<template>
<!-- 主页 -->
<!-- el-container组件是最外层的大容器 -->
<el-container>
    <!-- el-aside侧边栏容器 -->
    <el-aside>左侧导航</el-aside>
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
export default {

}
</script>

<style>

</style>
