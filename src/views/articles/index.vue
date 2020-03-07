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
      defaultImg: require('@/assets/img/login_bg.jpg') // 地址对应的文件变成了变量 编译时会拷贝到对应的位置

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
    getArticles () {
      // 发送请求
      this.$axios({
        url: '/articles' // 请求地址
      }).then((result) => {
        // 成功
        this.list = result.data.results // 把接口返回的数据赋值给数组
      })
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
