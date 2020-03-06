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
  <el-tabs @tab-click='changeTab' v-model="activeName" type="boder-card">
    <el-tab-pane label="全部" name="all" >
          <!--全部 素材图片 -->
          <div class="img-list">
            <!-- 素材图片显示 循环list数据-->
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <!-- 放置图片 赋值图片地址 -->
            <img :src="item.url" alt="">
           <!-- 操作栏 收藏删除图标显示 使用el-row 可用flex布局 -->
          <el-row class="operate" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-off"></i>
              <i class="el-icon-delete"></i>
          </el-row>
          </el-card>

          </div>
            </el-tab-pane>
    <el-tab-pane label="收藏" name="collect">收藏素材图片</el-tab-pane>
  </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认all全部
      list: [] // 放置素材管理的全部数据 收藏和全部的
    }
  },
  methods: {
    // 获取素材管理数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 地址
        params: { // get参数 == query参数
          collect: false // 请求参数 是否是收藏图片
        }
      }).then(request => {
      // 请求数据成功
        // console.log(request)
        //  request.data.results 是个数组 把这个数组给data中的变量
        this.list = request.data.results
      })
    },
    // 切换tab事件
    changeTab () {

    }
  },
  created () {
    // 实例化之后 调用接口 获取素材管理数据
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  .img-card{
     width: 220px;
     height: 240px;
     margin-bottom: 20px;
      img{
        width: 200px;
        height: 170px;
      }
      .operate{
        height: 30px;
      }
}
}

</style>
