<template>
  <div class="home-page">
    <header>{{userName}},欢迎您!
      <router-link class='exit' to='/login'>exit</router-link>
    </header>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userName: this.$store.state.userName
      }
    }
  }
</script>
<style lang="less" scoped>
  header{
    height:60px;
    background-color: #1b9095;
    line-height: 60px;
    color:white;
    text-align: right;
    padding-right:1rem;
    .exit{
      color:white;
      cursor: pointer;
    }

  }
</style>


