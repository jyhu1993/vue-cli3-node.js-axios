<template>
  <div class="home-page">
    <header>
      <div class="menu"><i @click='changeMenuShow' class="iconfont icon-caidan"></i></div>
      <div class="user-info">
        {{userName}},欢迎您!
        <router-link class='exit' to='/login'><i class="iconfont icon-tuichu"></i></router-link>
      </div>
    </header>
    <Viewpager></Viewpager>
    <HotShowing></HotShowing>
    <WaitingShowing></WaitingShowing>
    <transition name='slide'>
      <Menu v-show='menuShow'></Menu>
    </transition>
    <footer>make by Jing</footer>
  </div>
</template>
<script>
import Viewpager from '../components/Viewpager.vue'
import HotShowing from '../components/HotShowing.vue'
import WaitingShowing from '../components/WaitingShowing.vue'
import Menu from '../components/Menu.vue'
export default {
  data () {
    return {
      userName: this.$store.state.userName,
      menuShow: false
    }
  },
  methods:{
    changeMenuShow () {
      this.menuShow = !this.menuShow
    }
  },
  components: {
    Viewpager: Viewpager,
    HotShowing: HotShowing,
    WaitingShowing:WaitingShowing,
    Menu:Menu
  }
}
</script>
<style lang="less" scoped>
  .home-page{
    // 定义menu的过度动画
    .slide-enter-active,.slide-leave-active{
      transition:all 0.5s ease;
    }
    .slide-enter,.slide-leave-to{
      transform: translate(-100%,0);
      opacity: 0;
    }
    margin:60px 0;
    position: relative;
    header{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 100;
      height:60px;
      background-color: #1b9095;
      line-height: 60px;
      color:white;
      display: flex;
      justify-content: space-between;
      .iconfont{
        padding:0 1rem;
        cursor: pointer;
      }
      .exit{
        color:white;
      }
    }
    footer{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #1b9095;
      color:white;
      height: 60px;
      line-height: 60px;
    }
  }
</style>
