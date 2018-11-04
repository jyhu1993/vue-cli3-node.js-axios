<template>
  <div class="login-page">
    <div id="nav">
      <router-link to="/login/loginIn">Login in</router-link> |
      <router-link to='/login/signUp'>Sign up</router-link>
    </div>
    <section id="content">
      <img id="logo" src="@/assets/images/welcome.png">
      <router-view/>
    </section>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
  .login-page{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    height: 100%;
  }
  #nav {
    background-color: #1b9095;
    text-align: right;
    padding-right: 1rem;
    flex:0 0 auto;
    height: 60px;
    line-height: 60px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: white;
      }
    }
  }
  #content{
    flex:1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    #logo{
      padding:2rem;
    }
  }
</style>
