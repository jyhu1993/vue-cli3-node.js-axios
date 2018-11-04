<template>
  <section id="wait-showing">
    <div class="movie-num">
      <span>正在热映({{movieNum}})</span>
      <a @click='changeMark' href="#">下一页>></a>
    </div>
    <div class="movie" ref='movie'>
        <div v-show='num>minMark&&num<maxMark' v-for='num in movieNum' :key='num' class="item">
          <img @mouseover='showMask(num)' src="../assets/images/movie/02.jpg">
          <span @click='wantWatch' class="heart">
            <span class="heart-container">
              <span class="left"></span>
              <span class="right"></span>
            </span>
            想看{{num}}
          </span>
          <transition name='slide'>
            <div  v-show='num===maskMark' class="layout">
              <div class="mask"></div>
              <p @mouseout='hideMask'>
                导演:aa<br>
                主演:bb<br>
                类型:cc<br>
                片长:dd<br>
              </p>
            </div>
          </transition>
        </div>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        movieNum: Math.floor(30*Math.random() + 10),
        // 为每页能显示的影片数量设置minMark和maxMark
        minMark:0,
        maxMark:0,
        numInEveryLine:0,
        maskMark:0,
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
      changeMark (e) {
        e.preventDefault()
        if (this.maxMark > this.movieNum) {
          this.minMark = 0
          this.maxMark = this.numInEveryLine + 1
        }else{
          this.minMark += this.numInEveryLine
          this.maxMark += this.numInEveryLine
        }
      },
      // 遮罩层；
      showMask (num) {
        this.maskMark = num
      },
      hideMask (num) {
        this.maskMark = 0
      },
      // 点击想看改变心的颜色;
      wantWatch (e) {
        let target = e.target
        let heart = target.firstChild.childNodes
        for (var i = 0; i < heart.length; i++) {
          if(heart[i].style.backgroundColor === 'rgb(228, 25, 42)'){
            heart[i].style.backgroundColor = 'rgb(255, 255, 255)'
            this.$store.state.numOfCollectMovie -= 1
          }else{
            heart[i].style.backgroundColor = 'rgb(228, 25, 42)';
            this.$store.state.numOfCollectMovie += 1
          } 
        }
      }
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
        }
      }
    }
  }
</style>