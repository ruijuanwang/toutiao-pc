<template>
<!-- 文章内容列表组件 -->
<el-card>
    <!-- 面包屑 组件-->
<bread-crumb slot="header">
<template slot="title">内容列表</template>
</bread-crumb>
<!-- 搜索工具栏 筛选 -->
<!-- 表单容器 -->
<el-form>
    <!-- 每一个表单域由 el-form-item组件构成 表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio等-->
    <el-form-item label="文章状态：">
        <!-- 单选框组 -->
        <!-- 文章状态  label是当前v-model绑定的值-->
        <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，将5定义为全部 -->
        <el-radio-group v-model="searchForm.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
    </el-form-item>
    <!-- 通过频道接口获取数据 -->
    <el-form-item label="频道列表：">
        <!-- 频道列表 el-select组件-->
    <el-select v-model="searchForm.channel_id" placeholder="请选择">
        <!-- 循环生成el-option下拉选项 :label是显示值 :value是绑定的当前项-->
    <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id">
 </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="时间选择：">
        <!-- 时间选择 -->
        <!-- 日期范围选择组件  要设置type属性为 daterange-->
        <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
    </el-form-item>
</el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义表单数据对象
      searchForm: {
      // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，将5定义为全部
        status: 5, // 默认为全部状态
        channel_id: '', // 表示没有任何频道
        dateRange: []// 日期范围

      },
      channels: []// 频道列表数据

    }
  },
  methods: {
    // 获取频道列表方法
    getChannels () {
      // 发送请求
      this.$axios({
        url: '/channels' // 请求地址
      }).then((reslut) => {
      // 成功
        this.channels = reslut.data.channels// 把接口返回的数据赋值给数组
      })
    }
  },

  created () {
    this.getChannels() // 获取频道列表数据
  }

}
</script>

<style>

</style>
