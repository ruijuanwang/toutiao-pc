<template>
  <!-- 发布文章中 封面图片 ==>完成选择图片 和上传图片 的组件 -->
 <!-- 通过页签形式来显示  -->
 <!-- 绑定当前的激活页 显示name的值 name不能重复 name表示当前标签页的标识 -->
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="material">
        <!-- 查询全部的素材 -->
        <div class="select-image-list">
            <!-- 循环生成每一项 图片素材 用 el-card组件来包裹 -->
            <el-card v-for="item in list" :key="item.id" class="img-card">
                <!-- 显示图片素材 -->
                <img :src="item.url" @click="clickImg(item.url)" alt="">
            </el-card>
        </div>
        <!-- 页码组件  el-row用来布局-->
        <el-row type="flex" justify="center">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                @current-change='changePage'>
            </el-pagination>
        </el-row>
    </el-tab-pane>
    <!-- 上传素材图片 -->
    <el-tab-pane label="上传素材" name="upload">

    </el-tab-pane>
  </el-tabs>

</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 被激活的页签 默认是素材库
      list: [], // 用来接收图片素材数据
      //   分页数据对象
      page: {
        total: 0, // 总页码
        currentPage: 1, // 当前页
        pageSize: 8 // 一页放多少

      }
    }
  },
  methods: {
    // 点击图片时触发
    clickImg (url) {
    //  触发自定义事件  需要将url传递给上层父组件
    // 脚手架中的自定义事件名 大小写通用 不用纯小写
      this.$emit('selectOneImage', url)
    },
    //   获取图片素材的方法
    getMaterial () {
      //   调用获取用户图片素材接口
      this.$axios({
        url: '/user/images', // 地址
        params: {
          collect: false, // 是否是收藏图片 这里要全部图片
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize // 每页多少条
        }
      }).then(result => {
        this.list = result.data.results // 将全部素材数据 赋值给data中的变量
        this.page.total = result.data.total_count // 总页码赋值给页码变量
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage // 最新页码赋值给data变量
      this.getMaterial() // 重新获取 数据
    }
  },
  created () {
    this.getMaterial() // 获取全部图片素材
  }

}
</script>

<style lang='less' scoped>
.select-image-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card{
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

}
</style>
