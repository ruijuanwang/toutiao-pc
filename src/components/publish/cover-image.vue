<template>
<!-- 发布文章 中 的 封面图片组件 -->
  <div class="cover-image">
     <div v-for="(item,index) in list" :key="index" class="cover-image-item">
      <!-- 图片的地址就是item 刚开始item是空的 因为此时还没有选择图片 这时应该根据item是否有值来决定显示的图片是item还是默认图片 -->
      <!--item如果没有值 就显示默认图片 img如果不是固定地址的话 图片应该先转化成变量 -->
        <img :src="item ? item : defaultImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  // props接收父组件传过来的值
  props: ['list'], // 用数组来接收传递的参数
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png') // 默认图片 要转换成变量
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
        }
  }
}
</style>
