<template>
<!--素材管理 二级路由组件  -->

<!--el-card组件布局 想显示header部分要有显式具名 slot -->
  <el-card>
    <!-- 将面包屑给到 el-card的 具名插槽header  -->
    <bread-crumb slot="header">
    <!-- 面包屑组件 具名插槽 -->
    <template slot="title">素材管理</template>
  </bread-crumb>
  <!-- 上传图片el-upload 组件  使用row控制位置 -->
  <el-row type="flex" justify="end">
    <!-- action 必选的参数 上传的地址 可给空字符串 不写会报错  show-file-list 是否显示已上传文件列表 -->
     <el-upload :http-request="uploadImg" :show-file-list="false"  action=''>
       <el-button  size="small" type="primary">上传图片</el-button>
     </el-upload>
  </el-row>
  <!-- tab标签组件 tab-click  -->
 <!--  v-model="activeName" 绑定的值，就是所激活的页签  选项卡的 name -->
  <el-tabs @tab-click='changeTab' v-model="activeName" type="boder-card">
    <el-tab-pane label="全部" name="all" >
          <!--全部 素材图片 -->
          <div class="img-list">
            <!-- 素材图片显示 循环list数据-->
          <el-card v-for="item in list" :key="item.id" class="img-card" >
            <!-- 放置图片 赋值图片地址 -->
            <img :src="item.url" alt="">
           <!-- 操作栏 收藏删除图标显示 使用el-row 可用flex布局 -->
          <el-row class="operate" type="flex" justify="space-around" align="middle">
             <!-- is_collected 返回来的属性 true代表 收藏的素材 false代表全部素材 判断 -->
             <!-- 两个图标绑定点击事件 传值 -->
              <i @click='collectOrCancel(item)' :style="{color: item.is_collected ? 'red' : 'black'}" class="el-icon-star-on"></i>
              <i @click='delMaterial(item)' class="el-icon-delete-solid"></i>
          </el-row>
          </el-card>

          </div>
   </el-tab-pane>
            <!-- 收藏图片显示 -->
    <el-tab-pane label="收藏" name="collect">
        <!--收藏 素材图片 -->
          <div class="img-list">
            <!-- 素材图片显示 循环list数据-->
          <el-card v-for="item in list" :key="item.id" class="img-card-love">
            <!-- 放置图片 赋值图片地址 -->
            <img :src="item.url" alt="">
           <!-- 操作栏 收藏删除图标显示 使用el-row 可用flex布局 -->
          </el-card>

          </div>
    </el-tab-pane>
  </el-tabs>
<!-- 分页 -->
<el-row type="flex" justify="center" align="middle" style="height:60px">
      <!-- background 是否为分页按钮添加背景色  :total总页数
      分页组件需要动态的数据
      total 当前总页数
      current-page 当前的页码
      page-size 每页显示多少条
      监听current-change事件
      -->
      <el-pagination  background layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
       @current-change="chagePage">
      </el-pagination>
  </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认all全部
      list: [], // 放置素材管理的全部数据 收藏和全部的
      // page对象 页码的数据
      page: {
        currentPage: 1, // 当前页 默认1
        pageSize: 8, // 每页显示数量  默认4张
        total: 0// 总页数
      }
    }
  },
  methods: {
    // 获取素材管理数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 地址
        params: { // get参数 == query参数
          // collect: false // 请求参数 是否是收藏图片 true 代表获取收藏图片 false代表获取全部图片
          collect: this.activeName === 'collect', // 这个位置应该变活 根据当前的页签变活   activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
          per_page: this.page.pageSize, // 获取每页数量
          page: this.page.currentPage // 获取第几页 data中页码变量的值变了 获取的数据也会跟着变
        }
      }).then(request => {
      // 请求数据成功
        console.log(request)
        //  request.data.results 是个数组 把这个数组给data中的变量
        this.list = request.data.results
        this.page.total = request.data.total_count // 强求回来的总页码给当前data中的变量
      })
    },
    // 切换tab事件
    changeTab () {
      this.page.currentPage = 1 // 切换时tab栏时 将页码重置第1页  分类变了 数据也变了 从第一页显示
      // 发生改变的时候 可以根据当前 activeName来决定是获取哪个方面 的数据 重新调用接口
      // activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
      this.getMaterial()// 调用获取素材的方法
    },
    // 页码发生改变
    chagePage (newPage) {
      // newPage 参数 是当前点击的页码
      this.page.currentPage = newPage // 新的页码数赋值给data中的变量
      this.getMaterial() // 重新拉取数据 渲染页面
    },
    // 上传图片组件的方法
    uploadImg (params) {
      // console.log(params)
      // params 是一个对象 当前图片的所有信息 params.file 就是要上传的图片文件
      // 调用上传图片的接口 类型是 formdata类型
      var data = new FormData() // 实例化一个formdata对象
      data.append('image', params.file) // 加入文件参数
      // 发送上传请求
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 请求类型post
        data // es6简写 相当于 data:data

      }).then(() => {
        // 上传成功 重新拉取数据 渲染页面
        this.getMaterial()
        this.$message.success('上传素材成功')
      }).catch(() => {
        // 失败
        this.$message.error('上传素材失败')
      })
    },
    // 收藏或取消收藏素材方法
    collectOrCancel (row) {
      // item 是个对象 当前素材的信息
      this.$axios({
        url: `/user/images/${row.id}`, // 请求地址 需要拼接当前的id
        method: 'put', // 请求类型
        data: { // 放置body参数
          collect: !row.is_collected // 请求传的值要取反 is_collected 是布尔值 收藏是true 取消收藏false
        }
      }).then(() => {
        // 成功
        var mess = row.is_collected ? '取消' : '收藏'
        this.getMaterial() // 重新拉取数据
        this.$message.success(`${mess}成功!`)
      }).catch(() => {
        this.$message.error('操作失败!')
      })
    },
    // 删除素材
    delMaterial (row) {
      // 友好提示
      this.$confirm('您确定要删除吗？').then(() => { // 支持promise
      //  如果 确定删除  直接调用删除接口
        this.$axios({
          url: `/user/images/${row.id}`, // 请求地址 需要拼接当前的id
          method: 'delete', // 请求类型
          data: { // 放置body参数
            collect: !row.is_collected // 请求传的值要取反 is_collected 是布尔值 收藏是true 取消收藏false
          }
        }).then(() => {
        // 成功
          this.getMaterial() // 重新拉取数据
          this.$message.success('删除成功!')
        }).catch(() => {
          this.$message.error('删除失败!')
        })
      })
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
  .img-card-love{
    background-color: rgba(250, 182, 246, 0.3);
    margin-bottom: 20px;
      img{
        width: 200px;
        height: 170px;
      }
  }
  .img-card{
    background: rgba(181, 171, 241, 0.3);
     height: 240px;
     margin-bottom: 20px;

      img{
        width: 200px;
        height: 170px;
      }
      .operate{
        box-sizing: border-box;
        height: 30px;
        font-size: 25px;
        padding-top: 10px;
        i{
          cursor: pointer;
        }
      }
}
}

</style>
