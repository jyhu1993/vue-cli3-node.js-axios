<template>
  <section class="viewpager" ref='viewpager'>
    <div class="img-container" ref='imgContainer'>
      <transition-group name='fade'>
        <img @mouseout='go' @mouseover='stop' v-show='index === mark'  v-for="(url,index) in imgUrls" :src="url" :key="index" ref='img'>
      </transition-group>
    </div>
    <div class="tag">
      <span @click='change(index)' :class="{active:index===mark}" v-for='(url,index) in imgUrls' :key='index'></span>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      // 直接引入url不会被vue解析，需要以模块的形式引入
      imgUrls: [require('../assets/images/movie/01.jpg'), require('../assets/images/movie/02.jpg'), require('../assets/images/movie/03.jpg'), require('../assets/images/movie/04.jpg'), require('../assets/images/movie/05.jpg')],
      mark: 0,
      t: '',
      WHRatio: 16 / 9
    }
  },
  methods: {
    // 根据不同的媒体设备，取不同的宽高比，默认16/9
    setWHRadio () {
      // 设置PC端的宽高比
      if (window.innerWidth > 800) {
        this.WHRatio = 16 / 5
      }
    },
    setSectionSize () {
      // 设定section的高度
      let width = this.$refs.viewpager.clientWidth
      this.$refs.viewpager.style.height = width / this.WHRatio + 'px'
    },
    setImgSize () {
      // 为使图片完全铺满div且保持其原来的宽高比,判定图片的宽高比，以便设置width或height为100%
      let imgArr = this.$refs.img
      for (var i = 0; i < imgArr.length; i++) {
        let ratio = imgArr[i].clientWidth / imgArr[i].clientHeight
        // 由于每个图片节点加了v-show，在初次渲染时只能读取被显示出来了的图片的宽高信息，未被显示的宽高为零，ratio为NaN，因此在后续dom更新时，均需调用此函数，来设置显示出来的图片尺寸
        if (imgArr[i].clientWidth !== 0) {
          if (ratio > this.WHRatio) {
            imgArr[i].style.height = '100%'
          } else {
            imgArr[i].style.width = '100%'
          }
        }
      }
    },
    autoPlay () {
      this.mark += 1
      if (this.mark === 5) {
        this.mark = 0
      }
    },
    play () {
      this.t = setInterval(this.autoPlay, 2500)
    },
    // 鼠标移出时继续轮播；
    go () {
      this.play()
    },
    // 鼠标移入时停止轮播；
    stop () {
      clearInterval(this.t)
    },
    // 为tag添加点击事件，改变图片；
    change (index) {
      this.mark = index
    }

  },
  updated () {
    // 图片节点更新时，调用此函数；
    this.setImgSize()
  },
  mounted () {
    this.setWHRadio()
    this.setSectionSize()
    // 初次挂载时设置首张图片的尺寸；
    this.setImgSize()
    // 调用轮播函数；
    this.play()
  }
}
</script>
<style lang="less" scoped>
  .viewpager{
    //定义过度css
    .fade-enter-active,.fade-leave-active{
      transition: opacity 1s
    }
    .fade-enter,.fade-leave-to{
      opacity: 0
    }
    font-size: 0;
    width: 100%;
    overflow: hidden;
    position: relative;
    .img-container{
      width:100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .tag{
      position: absolute;
      z-index: 1;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,0);
      margin-bottom: 1rem;
      span{
        border:solid white 1px;
        border-radius: 0.3rem;
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin:0 0.2rem;
      }
      .active{
        background-color: white;
      }
    }
  }

</style>
