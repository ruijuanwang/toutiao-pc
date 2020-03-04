<template>
   <!-- 评论列表导航组件 -->
   <!--1. 用card 做 主页面 -->
 <el-card>
     <!-- 2.面包屑组件 具名插槽 name='title' 作为card的头部标题显示-->
     <bread-crumb>
     <template slot="title">评论列表</template>
     </bread-crumb>
    <!-- 3.表格 使用el-table组件 stripe属性可以创建带斑马纹的表格 stripe(简写) stripe:'true'(完整模式)-->
       <el-table :data="list" stripe style="width: 100%">
        <!-- el-table-column 表格的每一列 label属性定义表格的列名  prop属性代表对象中的键名可填入数据 width属性定义宽度-->
        <el-table-column  prop="date" label="标题" width="600"></el-table-column>
        <el-table-column  prop="name" label="评论状态"></el-table-column>
        <el-table-column  prop="address" label="总评论数" ></el-table-column>
        <el-table-column  prop="address" label="评论粉丝数" ></el-table-column>
        <el-table-column  prop="address" label="操作"></el-table-column>

    </el-table>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
        // { date: '1', name: '张三', address: '1212' },
        // { date: '1', name: '张三', address: '1212' },
        // { date: '1', name: '张三', address: '1212' } 假数据 为了测试
      ]
    }
  }

}
</script>

<style>

</style>
