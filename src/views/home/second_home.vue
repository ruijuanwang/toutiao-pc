<template>
<!-- 二级路由首页默认组件 -->
  <div class="second_home">
      <!-- 幻灯片 -->
      <el-carousel :interval="3000" type="card" height="550px">
    <el-carousel-item v-for="item in list" :key="item">
          <img :src='item' />
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://attach.bbs.miui.com/forum/201311/17/174124tp3sa6vvckc25oc8.jpg',
        'http://img2.imgtn.bdimg.com/it/u=3637179316,2553684464&fm=26&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=4065465660,255063997&fm=26&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=3922447756,2440710177&fm=26&gp=0.jpg'
      ]
    }
  }

}
</script>

<style lang='less' scoped>
.second_home{
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);//calc 在css中计算数值 calc(四则运算) 注意：运算符之间要有空格
       background: url('../../assets/img/bg.jpg');
        background-size: cover;
img{
    // width: 100%;
    height: 100%;
}
   }
</style>
