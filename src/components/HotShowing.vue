<template>
  <section id="hot-showing">
    <div class="movie-num">
      <span>正在热映({{movies.length}})</span>
      <a @click='changeMark' href="#">下一页>></a>
    </div>
    <div class="movie" ref='movie'>
        <div v-show='index>minMark&&index<maxMark' v-for='(movie,index) in movies' :key='index' class="item">
          <img @mouseover='showMask(index)' :src="movie.url">
          <span>购票{{index}}</span>
          <transition name='slide'>
            <div  v-show='index===maskMark' class="layout">
              <div class="mask"></div>
              <p @mouseout='hideMask'>
                片名:{{movie.name}}<br>
                导演:{{movie.director}}<br>
                主演:{{movie.actor}}<br>
                片长:{{movie.time}}<br>
              </p>
            </div>
          </transition>
        </div>
    </div>
  </section>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        movies:Array,
        minMark:-1,
        maxMark:0,
        numInEveryLine:0,
        maskMark:-1
      }
    },
    created () {
      // 向服务器发起请求，获取正在热映的影片信息；
      axios.get('http://192.168.3.6:1234/getShowingMovie')
        .then((response) => {
          this.movies = response.data.hotShowingMovie
          for (var i = 0; i < this.movies.length; i++) {
            let url = this.movies[i].url
            this.movies[i].url = require('../../'+url+'.jpeg')
          }
        })
        .catch(function(err){
          console.error(err);
        })

    },
    methods:{
      // 确认每行有几个item，并初始化minMark,maxMark,numInEveryLine的值
      showedItem () {
        let movieWith = this.$refs.movie.clientWidth
        if (movieWith > 699) {
          this.numInEveryLine = Math.floor(movieWith / 160)
        }else{
          this.numInEveryLine = Math.floor(movieWith / 80)
        }
        this.maxMark = this.numInEveryLine + 1
      },
      // 点击事件改变mark;
      changeMark (e) {
        e.preventDefault()
        if (this.maxMark > this.movies.length) {
          this.minMark = -1
          this.maxMark = this.numInEveryLine + 1
        }else{
          this.minMark += this.numInEveryLine
          this.maxMark += this.numInEveryLine
        }
      },
      // 遮罩层；
      showMask (index) {
        this.maskMark = index
      },
      hideMask (index) {
        this.maskMark = -1
      }
    },
    mounted () {
      this.showedItem()
    }
  }
</script>
<style lang="less">

  #hot-showing{
    // 设置动画；
    .slide-enter-active,.slide-leave-active{
      transition:all 0.5s ease;
    }
    .slide-enter,.slide-leave-to{
      transform: translate(0,-100%);
      opacity: 0;
    }
    padding:1rem 1rem;
    .movie-num{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      a{
        text-decoration: none;
      }
    }
    .movie{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      font-size: 0;
      height: 250px;
      .item{
        height: 100%;
        border:1px solid #eee;
        flex:0 0 auto;
        overflow: hidden;
        width: 160px;
        position: relative;
        .layout,.mask,p{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 80%;
          .mask{
            height: 100%;
            background-color: black;
            opacity: 0.5;
          }
          p{
            height: 100%;
            color:white;
            font-size: 1rem;
            text-align: left;   
            padding:1rem;
            overflow: hidden;       
          }
        }
        img{
          height: 80%;
          width: 100%;
        }
        span{
          font-size: 1rem;
          display: inline-block;
          height: 20%;
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: center;
          background-color: #1b9095;
          color:white;
          cursor: pointer;
        }
      }
    }
  }
  // 设置移动端的宽高；
  @media (max-width:699px) {
    #hot-showing{
      .movie{
        flex-wrap:nowrap;
        height: 140px;
        .item{
          width: 80px;
          .layout{
            p{
              font-size: 0.5rem;
              padding:0.5rem;
              overflow: hidden;
            }
          }
        }
      }
    }
  }

</style>