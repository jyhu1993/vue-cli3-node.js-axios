<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="less">
@import url('./assets/styles/global.less');
body,html{
  height: 100%;
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
