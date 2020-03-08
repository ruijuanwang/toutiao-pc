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
        <!-- 第一种 监听值改变的方式 实现筛选功能 -->
        <!-- <el-radio-group @change="changeCondition" v-model="searchForm.status"> -->
        <el-radio-group v-model="searchForm.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
    </el-form-item>
    <!-- 通过频道接口获取数据 -->
    <el-form-item  label="频道列表：">
        <!-- 频道列表 el-select组件-->
        <!-- 第一种 监听值改变的方式 实现筛选功能 -->
    <!-- <el-select @change="changeCondition" v-model="searchForm.channel_id" placeholder="请选择"> -->
    <el-select v-model="searchForm.channel_id" placeholder="请选择">
        <!-- 循环生成el-option下拉选项 :label是显示值 :value是绑定的当前项-->
    <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id">
 </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="时间选择：">
        <!-- 时间选择 -->
        <!-- 日期范围选择组件  要设置type属性为 daterange-->
        <!-- 显示值和存储值的结构不一致 使用value-format指定绑定值的格式。 -->
        <!-- 第一种 监听值改变的方式 实现筛选功能 -->
        <!-- <el-date-picker value-format="yyyy-MM-dd" @change="changeCondition" type="daterange" v-model="searchForm.dateRange"></el-date-picker> -->
        <el-date-picker value-format="yyyy-MM-dd" type="daterange" v-model="searchForm.dateRange"></el-date-picker>
    </el-form-item>
</el-form>
<!-- 文章主体结构 -->
<el-row type="flex" align="middle" class="total">共找到100条符合条件的数据</el-row>
<!--列表内容 article-item 作为一个循环项   item.id是个大数字对象 -->
 <div class="article-item" v-for="item  in list" :key="item.id.toString()">
    <!-- 左侧显示 -->
    <div class="left">
        <!-- 用变量的形式赋值 有图片就用原图片 没有就使用默认图片 -->
    <img :src="item.cover.length?item.cover.images[0]:defaultImg" alt="">
    <div class="info">
        <!-- 文章标题 -->
        <span>{{item.title}}</span>
        <!-- el-tag 组件标签 -->
          <!--   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败 -->
      <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
         <el-tag :type="item.status | filterType" class='tag'>{{item.status | filterStatus }}</el-tag>
         <!-- 发表日期 -->
        <span class="date">{{item.pubdate}}</span>
    </div>
    </div>
    <!-- 右侧显示 -->
    <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
    </div>
</div>
<!-- 分页组件 -->
<!-- :total      总页码
  :current-page 当前页
  :page-size    每页放多少条
   @current-change 页码改变事件
 -->
<el-row type="flex" justify="center" align="middle" style="height:80px">
  <el-pagination background layout="prev, pager, next"
 @current-change='changeCurrent'
  :total="page.total"
  :current-page="page.currentPage"
  :page-size="page.pageSize"
  >
</el-pagination>
</el-row>
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
      channels: [], // 接收频道列表数据
      list: [], // 接收文章内容列表数据
      defaultImg: require('@/assets/img/login_bg.jpg'), // 地址对应的文件变成了变量 编译时会拷贝到对应的位置
      // 定义一个分页数据对象
      page: {
        total: 0, // 总页码
        currentPage: 1, // 当前页 默认第一页
        pageSize: 10 // 每页多少条

      }
    }
  },
  methods: {
    // 获取频道列表方法
    getChannels () {
      // 发送请求
      this.$axios({
        url: '/channels' // 请求地址
      }).then((result) => {
      // 成功
        this.channels = result.data.channels// 把接口返回的数据赋值给数组
      })
    },
    // 获取内容列表数据 方法
    getArticles (params) { // 参数 如果不传就是undefined
      // 发送请求
      this.$axios({
        url: '/articles', // 请求地址
        params // 简写
      }).then((result) => {
        // 成功
        this.list = result.data.results // 把接口返回的数据赋值给数组
        this.page.total = result.data.total_count // 页码
        this.page.pageSize = result.data.per_page
      })
    },
    // 改变了条件 (做筛选功能)
    changeCondition (newPage) {
      // 当触发此方法的时候 表单数据已经变成最新的了
      // 组装条件 params
      var params = {
        page: this.page.currentPage, // 如果条件改变就回到第一页
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 文章状态 5 是我们虚构的
        channel_id: this.searchForm.channel_id ? this.searchForm.channel_id : null, // 频道类型
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 起始日期先要判断是否有有值
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null // 截止日期 是当前数组的第二项

      }
      // 发生改变 根据条件调用接口 获取数据
      this.getArticles(params) // 直接传入参数 调用接口
    },
    // 切换分页
    changeCurrent (newPage) {
      // newPage 点击时候的页码
      this.page.currentPage = newPage // 新的页码重新赋值
      this.changeCondition() // 调用带着条件的方法并且把最新页码 作为参数传进去 重新拉取数据 点击页的数据
    }

  },
  // 过滤器 处理文章状态显示格式
  //   过滤器要有返回值
  filters: {
    filterStatus (value) {
      // 过滤器的第一个参数是管道前面的值
    //   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败
    //   根据不同的数字判断显示的状态
      switch (value) {
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2 :
          return '已发表' // 审核通过
        case 3 :
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达式中 还可用在 v-bind 的表达式中
    filterType (value) {
      //  根据当前状态的值 显示不同类型的tag标签
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info' // 待审核
        case 2 :
          return '' // 审核通过 空 默认蓝色
        case 3 :
          return 'danger' // 审核失败
      }
    }

  },

  created () {
    this.getChannels() // 获取频道列表数据
    this.getArticles() // 获取内容列表数据
  },
  // 监听data中的数据 监听谁写谁的名字
  // watch还可以监听 一个 对象
  // 监听表单对象 searchForm数据的方法  筛选第二种方案(深度检测方案)
  watch: {
    searchForm: {
      deep: true, // 固定写法 深度监听
      handler () { // handler固定写法 监听的数据一旦发生变化 就会执行这个函数
        this.page.currentPage = 1 // 当条件改变了(筛选) 页码要重置到第一页
        // 调用 统一改变条件的方法 调用接口
        this.changeCondition() // this指向组件实例
      }
    }
  }

}
</script>

<style lang='less' scoped>
.total{
    height: 60px;
    border-bottom: 1px dashed #ccc;
}
.article-item{
    padding: 20px  0;
    display: flex;
    justify-content:space-between;
    align-content:center;
    border-bottom: 1px solid #ccc;
    .left{
        display: flex;
        .info{
           display: flex;
            flex-direction: column;
            justify-content: space-around;
            .date{
                clear: #999;
                font-size: 12px;
            }
            .tag{
                width: 60px;
                text-align: center;
            }
        }
        img{
            width: 180px;
            height: 100px;
            margin-right: 20px;
        }
    }
   .right{
        span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
}
   }
</style>
