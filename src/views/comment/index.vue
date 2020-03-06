<template>
   <!-- 评论列表导航组件 -->
   <!--1. 用card 做 主页面 -->
 <el-card>
     <!-- 具名插槽 slot="header" 给了el-card(给卡片组件填坑) 作为card的头部标题显示-->
     <bread-crumb slot="header">
      <!-- 2.面包屑组件 具名插槽  slot="title" 给了bread-crumb(给面包屑组件填坑) -->
     <template slot="title">评论列表</template>
     </bread-crumb>
    <!-- 3.表格 使用el-table组件 stripe属性可以创建带斑马纹的表格 stripe(简写) stripe:'true'(完整模式)-->
     <!-- v-loading指令的元素值为布尔值 当请求数据前让它显示遮罩层 设置true 数据请求回来 设置false -->
       <el-table :data="list" stripe style="width: 100%"
       v-loading="loading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
        <!-- el-table-column 表格的每一列 label属性定义表格的列名  prop属性代表对象中的键名可填入数据 width属性定义宽度-->
        <el-table-column  prop="title" label="标题" width="600"></el-table-column>
        <!-- 评论状态是布尔值 table不显示布尔值 所以要用一个formatter属性 来格式化内容 -->
        <el-table-column :formatter='formatterBool'  prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column  prop="total_comment_count" label="总评论数" ></el-table-column>
        <el-table-column  prop="fans_comment_count" label="评论粉丝数" ></el-table-column>
        <el-table-column width="200px"  prop="address" label="操作">
            <!-- el-table-column 组件 在插槽中传出了 row $index store column -->
            <!-- 作用域插槽 通过slot-scope来接收 row行数据 $index是索引 -->
             <template slot-scope="obj">
            <el-button type="text" size='small' icon="el-icon-edit-outline">修改</el-button>
            <!-- 打开或者关闭评论 根据评论状态来决定 通过作用域插槽获取row的数据 -->
             <!-- @click="openOrClose(obj.row) 给按钮绑定事件 并且要传一个参数过去 obj.row表示点击的当前行-->
            <el-button @click="openOrClose(obj.row)" type="text" size='small' icon="el-icon-document">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
            </template>
        </el-table-column>

    </el-table>
    <!-- 放置分页组件 使用el-row来布局
    分页组件： el-pagination -->
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
      :current-page ='page.currentPage'
      :page-size='page.pageSize'
      @current-change="chagePage">
      </el-pagination>
  </el-row>
 </el-card>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      // 分页动态参数 放一个page对象 数据更清晰
      page: {
        total: 0, // 总页数默认0
        currentPage: 1, // 当前页默认1
        pageSize: 10 // 每页显示多少条 默认10
      },
      loading: false // 控制loading遮罩层的显示或者隐藏 默认false

    }
  },
  methods: {
    //   获取评论列表 调用接口 请求数据 渲染页面
    getComment () {
      this.loading = true // 打开遮罩层

      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          per_page: this.pageSize, // 每次请求几条 默认10条
          page: this.page.currentPage // 查对应码 请求第几页

        }
        // query参数应该在哪个位置传 axios
        // params 传get参数也就是query参数
        // data   传body参数也就是请求体参数
      }).then(request => {
        // 数据在 request.data.results 它是个数组
        this.list = request.data.results
        // 请求来的总页数 给 data中的总页数total
        this.page.total = request.data.total_count
        this.loading = false// 数据请求回来 关闭遮罩层
      })
    },
    // 定义格式化的函数 格式化布尔值 评论状态
    formatterBool (row, column, cellValue, index) {
      // row代表当前的一行数据
      // column代表当前列的信息
      // cellValue 代表当前单元格的值
    //   index 代表当前索引
    // 该函数要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论的方法  row接收参数 当前被点击的行数据
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      //   友好提示  $confirm 方法支持promise 用户点击确定会进入then  点击取消会进入catch
      this.$confirm(`确定${mess}评论吗`, '提示', { type: 'warning' }).then(() => {
        //   提示弹框中点击确定 进入then方法 调用接口
        this.$axios({
          url: '/comments/status', // 地址
          method: 'put', // 请求类型
          //   query参数
          params: {
            //   为什么 评论列表打开或者关闭失败  因为原来后端传的 id 前端再次传过去 id发生了变化
            // 所以我们用大数字包 保证id不被转化 就可以使用原来的功能
            article_id: row.id.toString()// 要求传入参数 文章id  BigNumber 类型转化成字符串
            // 前端传的字符串 到后端只要和原数字一致 后端自动将字符串转换成大数字
            // 只要保证id和传过来的id一致就行
          },
          data: {
            // body参数
            allow_comment: !row.comment_status // 打开或者关闭 和评论状态相反
          }
        }).then(() => {
          // 请求成功 进入then
        //   提示 打开或关闭评论 然后重新拉取数据
          this.$message.success(`${mess}评论成功`)
          //   重新拉取数据
          this.getComment() // 调用重新 获取评论列表数据的 方法
        }).catch(() => {
          // 请求失败 进入catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    },
    // 分页点击页码发生变化事件
    chagePage (newPage) {
      // currentPage 参数是当前点击的最新页数
      // 当我点击的时候 把最新的页码给data数据中 重新调用接口 获取当前点击页的数据
      this.page.currentPage = newPage // 点击的最新页码给到  data数据中的 当前页
      this.getComment() // 重新获取数据  调用接口 (获取评论)
    }

  },
  created () {
    //   在钩子函数中 直接获取数据
    this.getComment()
  }

}
</script>

<style>

</style>
