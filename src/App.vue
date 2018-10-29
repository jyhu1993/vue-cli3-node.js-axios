<template>
  <div id="app">
    <div id="nav">
      <router-link to="/loginIn">Login in</router-link> |
      <router-link to="/signUp">Sign up</router-link>
    </div>
    <section id="content">
      <router-view/>
    </section>
  </div>
</template>

<style lang="less">
body,html{
  margin:0;
  padding:0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 100%;
}
#nav {
  background-color: #1b9095;
  text-align: right;
  padding-right: 10px;
  flex:0 0 auto;
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
  justify-content: center;
  align-items: center;
}
</style>
