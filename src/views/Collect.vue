<template>
  <div id="collect-page">
    <div v-for='movie in wantWatchMovies'  class="item">
      <div class="img">
        <img :src="movie.url">
      </div>
      <p>
        片名:{{movie.name}}<br>
        导演:{{movie.director}}<br>
        演员:{{movie.actor}}<br>
        时长:{{movie.time}}<br>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    wantWatchMovies () {
      let wantWatchMovies = this.$store.state.wantWatchMovies
      return wantWatchMovies
    }
  }
}
</script>
<style lang="less" scoped>
#collect-page{
  .item{
    width: 100%;
    padding:1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
    .img{
      width: 30%;
      flex: 0 0 auto;
      img{
        width: 100%;
      }
    }
    p{
      padding: 0.5rem 1rem;
      text-align: left;
      flex: 1 1 auto;
    }
  }
}

</style>
