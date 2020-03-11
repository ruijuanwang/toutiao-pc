<template>
<!-- 左侧导航组件 -->
<div class="layout-aside">
    <!-- 1.头部图片logo -->
    <!-- 图片根据 通过父组件传递过来的变量来决定图片显示还是隐藏 -->
    <div class="title" v-show="!collapse">
        <img src="../../assets/img/login_logo.png" alt="">
    </div>
    <!--2.导航菜单容器 el-menu  -->
      <!-- 开启路由导航 router="true"(完整模式) router(简写模式)-->
      <!-- collapse 导航折叠 -->
    <el-menu :collapse='collapse' router background-color="#323745" text-color="#adafb5">

         <!--3. 子菜单无下拉的子菜单 用el-menu-item标签组件  -->
        <el-menu-item index='/home'>
            <i class="el-icon-s-home"></i>
            <span>首页</span>
        </el-menu-item>
        <!--4. 有下拉子菜单二级菜单  用el-submenu标签组件   -->
        <!-- 内容管理 -->
        <el-submenu index='1'>
            <!-- 4.1 具名插槽是一级菜单 -->
            <template slot="title">
               <i class="el-icon-location"></i>
               <span>内容管理</span>
            </template>
            <!-- 4.2 匿名插槽是二级菜单 -->
            <!-- 二级菜单 每一项用el-menu-item标签组件 -->
            <el-menu-item index='/home/publish'>发布文章</el-menu-item>
            <el-menu-item index='/home/articles'>内容列表</el-menu-item>
            <el-menu-item index='/home/comment'>评论列表</el-menu-item>
            <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>

        <!-- 粉丝管理 -->
        <el-submenu index='2'>
            <template slot="title">
               <i class="el-icon-star-off"></i>
               <span>粉丝管理</span>
            </template>
            <el-menu-item index='/home/picture'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>

     <!-- 无子菜单 用el-menu-item标签组件  -->
         <el-menu-item index="/home/account">
           <i class="el-icon-s-custom"></i>
           <span>账户信息</span>
         </el-menu-item>

     </el-menu>
   </div>
</template>

<script>

export default {
  props: ['collapse'] // 接收父组件传来的变量
}
</script>

<style lang='less' scoped> // scoped:只在当前页面组件起作用
.layout-aside {
      background-color: #2e2f32;
      width:230px;
      height: 100vh;
       .title{
            text-align: center;
            padding: 10px 0;
            img{
                width: 120px;
                height: 30px;
            }
        }
        .el-menu{
                border-right: none
       }
    }
</style>
