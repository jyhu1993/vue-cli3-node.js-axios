<template>
  <div class="home-page">
    <header>
      <div class="menu"><i class="iconfont icon-caidan"></i></div>
      <div class="user-info">
        {{userName}},欢迎您!
        <router-link class='exit' to='/login'><i class="iconfont icon-tuichu"></i></router-link>
      </div>
    </header>
    <Viewpager></Viewpager>
  </div>
</template>
<script>
  import Viewpager from '../components/Viewpager.vue'
  export default {
    data () {
      return {
        userName: this.$store.state.userName
      }
    },
    components:{
      Viewpager:Viewpager,

    }
  }
</script>
<style lang="less" scoped>
  header{
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
</style>


