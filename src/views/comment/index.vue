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
 </el-card>
</template>

<script>

export default {
  data () {
    return {
      list: []

    }
  },
  methods: {
    //   获取评论列表 调用接口 请求数据 渲染页面
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'// 此参数用来控制获取数据类型
        }
        // query参数应该在哪个位置传 axios
        // params 传get参数也就是query参数
        // data   传body参数也就是请求体参数
      }).then(request => {
        // 数据在 request.data.results 它是个数组
        this.list = request.data.results
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
      var mess = row.comment_status ? '关闭' : '打开'
      //   友好提示  $confirm 方法支持promise 用户点击确定会进入then  点击取消会进入catch
      this.$confirm(`确定${mess}评论吗`, '提示', { type: 'warning' }).then(() => {
        //   提示弹框中点击确定 进入then方法 调用接口
        this.$axios({
          url: '/comments/status', // 地址
          method: 'put', // 请求类型
          //   query参数
          params: {
            article_id: row.id // 要求传入参数 文章id
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
