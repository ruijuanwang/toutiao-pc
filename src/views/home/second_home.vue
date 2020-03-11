<template>
<!-- 二级路由首页默认组件 -->
  <div class="second_home">
      <!-- 幻灯片 -->
      <!-- <el-carousel :interval="3000" type="card" height="550px">
    <el-carousel-item v-for="item in list" :key="item">
          <img :src='item' />
    </el-carousel-item>
  </el-carousel> -->
  <!-- 视频标签 -->
  <video class="girl" autoplay='autoplay'  src="../../assets/img/girl.mp4" loop='loop' muted='muted' > </video>
  <!-- 音频标签 -->
  <audio style="width:250px;height:30px;margin:10px" src='../../assets/img/music.mp3' loop='loop' controls='cotrols'  autoplay='autoplay'></audio>
<!-- 日历 -->
<el-calendar class="time">
</el-calendar>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // list: [
      //   'http://attach.bbs.miui.com/forum/201311/17/174124tp3sa6vvckc25oc8.jpg',
      //   'http://img.huoying666.com/forum/201702/24/162645hzlqlmk3m8ca3cax.jpg.thumb.jpg',
      //   'http://img3.imgtn.bdimg.com/it/u=4065465660,255063997&fm=26&gp=0.jpg',
      //   'http://img3.imgtn.bdimg.com/it/u=3922447756,2440710177&fm=26&gp=0.jpg'
      // ]
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
    width: 100%;
    height: 100%;
}
.girl{
  position:absolute;
   width: 100%;
}
.time{

 position:absolute;
 overflow: hidden;;
 left: 10px;
 top: 50px;
 text-align: center;
 background:rgba(0, 0, 0, 0.2);

 width: 400px;
 height: 350px;
 /deep/ .el-calendar-day{
   height: 35px;
 }

}

}

</style>
