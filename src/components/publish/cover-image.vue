<template>
<!-- 发布文章 中 的 封面图片组件 -->
  <div class="cover-image">
     <div v-for="(item,index) in list" :key="index" class="cover-image-item">
      <!-- 图片的地址就是item 刚开始item是空的 因为此时还没有选择图片 这时应该根据item是否有值来决定显示的图片是item还是默认图片 -->
      <!--item如果没有值 就显示默认图片 img如果不是固定地址的话 图片应该先转化成变量 -->
      <!-- 需要把当前我点击的图片的索引传过去 -->
        <img @click="openDialog(index)" :src="item ? item : defaultImg" alt="">
        <!-- 注册点击事件 点击弹出一个层 -->
        <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 再次封装一个组件  选择图片的组件 -->
          <!-- 监听谁的自定义事件 就在谁的标签上写v-on/@ -->
          <select-image @selectOneImage="receiveImg"></select-image>
        </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  // props接收父组件传过来的值
  props: ['list'], // 用数组来接收传递的参数
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片 要转换成变量
      dialogVisible: false, // 弹层 默认隐藏
      selectIndex: -1 // 用来记录当前我点击了哪个索引
    }
  },
  methods: {
    // 点击图片是弹出一个层
    openDialog (index) {
      this.dialogVisible = true // 弹层显示
      this.selectIndex = index // 记录当前点击的图片索引
    },
    // 接收图片地址
    receiveImg (url) {
      // 接收到了子组件传的url 我们还需要往上一层再次传递
      // 因为props数据 只能读取 但不能修改
      // 二次传递的时候 需要传递两个参数 地址和索引（需要把当前点击的图片的索引传递过去）
      this.$emit('selectTwoImage', url, this.selectIndex)
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
  display: flex;
   margin: 20px 100px;
  .cover-image-item{
     border: 1px solid #ccc;
       width: 250px;
        height: 250px;
        padding: 20px;
        margin-right: 10px;
        img{
          width:100%;
          height:100%;
          cursor: pointer;
        }
  }
}
</style>
