<template>
  <section id="wait-showing">
    <div class="movie-num">
      <span>即将上映({{movies.length}})</span>
      <a @click='changeMark' href="#">下一页>></a>
    </div>
    <div class="movie" ref='movie'>
        <div v-show='index>minMark&&index<maxMark' v-for='(movie,index) in movies' :key='index' class="item">
          <img @mouseover='showMask(index)' :src="movie.url">
          <span @click.self='wantWatch($event,movie)' class="heart">
            <span class="heart-container">
              <span class="left"></span>
              <span class="right"></span>
            </span>
            想看{{index}}
          </span>
          <transition name='slide'>
            <div  v-show='index===maskMark' class="layout">
              <div class="mask"></div>
              <p @mouseout='hideMask'>
                片面:{{movie.name}}<br>
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
        // 为每页能显示的影片数量设置minMark和maxMark
        minMark:-1,
        maxMark:0,
        numInEveryLine:0,
        maskMark:-1,
        wantWatchMovies:[]
      }
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
      changeMark (event,movie) {
        event.preventDefault()
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
      },
      // 点击想看改变心的颜色，并存储对应的电影
      wantWatch (event,movie) {
        let target = event.target
        let heart = target.firstChild.childNodes
        if(heart[0].style.backgroundColor === 'rgb(228, 25, 42)'){
          heart[0].style.backgroundColor = 'rgb(255, 255, 255)'
          heart[1].style.backgroundColor = 'rgb(255, 255, 255)'
          this.$store.commit('decrement',1)
          let index = this.wantWatchMovies.indexOf(movie)
          if (index !== -1) {
            this.wantWatchMovies.splice(index,1)
          }
        }else{
          heart[0].style.backgroundColor = 'rgb(228, 25, 42)';
          heart[1].style.backgroundColor = 'rgb(228, 25, 42)';
          this.$store.commit('increment',1)
          this.wantWatchMovies.push(movie)
        } 
        axios({
          method:'post',
          url:'http://192.168.3.6:1234/saveWantWatchMovies',
          data:JSON.stringify({
            user:this.$store.state.userName,
            wantWatchMovies:this.wantWatchMovies
          })
        })
      },
      // 向服务器发送请求，初始化影片内容
      initWaitingShowing () {
        axios.get('http://192.168.3.6:1234/getWaitingMovie')
        .then((response) => {
          this.movies = response.data.waitShowingMovie
          for (var i = 0; i < this.movies.length; i++) {
            let url = this.movies[i].url
            this.movies[i].url = require('../../'+url+'.jpeg')
          }
        })
        .catch(function(err){
          console.error(err);
        })

      }
    },
    created () {
      // 向服务器发起请求，获取即将上映的影片信息；
      this.initWaitingShowing()
    },
    mounted () {
      this.showedItem()
    }
  }
</script>
<style lang="less">


  #wait-showing{
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
          }
        }
        img{
          height: 80%;
          width: 100%;
        }
        .heart{
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
          .heart-container{
            position: relative;
            display: inline-block;
            height: 100%;
            width: 26px;
            .left,.right{
              position: absolute;
              left:50%;
              top:48%;
              width: 16px;
              height: 18px;
              background-color: rgb(255,255,255);
              border-radius: 9px 9px 0 0;
            }
            .left{
              transform: translate(-100%,-50%) rotate(-60deg);
            }
            .right{
              transform: translate(-50%,-50%) rotate(60deg);
            }
          }
        }
      }
    }
  }
  // 设置移动端的宽高；
  @media (max-width:699px) {
    #wait-showing{
      .movie{
        flex-wrap:nowrap;
        height: 140px;
        .item{
          width: 80px;
          .layout{
            p{
              padding:0.5rem;
              font-size: 0.5rem;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>