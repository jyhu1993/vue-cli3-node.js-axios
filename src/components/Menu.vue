<template>
  <aside id="aside">
    <div class="head">
      <label for="file"><img class="show-img" :src="url" title="点击更换头像"></label>
      <input @change='uploadImage' type="file" id="file" name="pic" value="" accept="image/*">
    </div>
    <div class="item"><router-link  to='/order'>我的订单({{order}})<span>></span></router-link></div>
    <div class="item"><router-link  to='/collect'>我的收藏({{collect}})<span>></span></router-link></div>
  </aside>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        // 默认url
        url:require('../assets/images/movie/01.jpg'),
        order:0,
      }
    },
    computed:{
      collect () {
        return this.$store.state.wantWatchMovies.length
      }
    },
    methods:{
      uploadImage (e) {
        console.log(1)
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        let that = this
        reader.onload = function(){
          // 使读取的图片立即呈现在页面上；
          that.url = this.result
          let content = {
            user:that.$store.state.userName,
            headImg:that.url
          }
          content = JSON.stringify(content)
          axios.post('http://192.168.3.6:1234/saveImage', content).then(function(response){
            console.log(response)
          }).catch(function(err){
            console.error(err)
          })
        }
      },
      // 读取用户信息；
      downloadUserInfo () {
        var that = this
        axios({
          method:'post',
          url:'http://192.168.3.6:1234/checkUserInfo',
          data:JSON.stringify({
            user:this.$store.state.userName
          })
        }).then((response) => {
          if (response.data.headImg !== undefined) {
            that.url = response.data.headImg
          }
          if (response.data.wantWatchMovies === undefined) {
            that.$store.commit('initWantWatchMovies', [])
          }else{
            that.$store.commit('initWantWatchMovies', response.data.wantWatchMovies)
          }
        })
      }
    },
    created () {
      this.downloadUserInfo()
    }

  }
</script>
<style lang="less" scoped>
  #aside{
    padding:0.5rem;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 60px;
    bottom: 60px;
    box-sizing: border-box;
    width: 200px;
    background-color: #1b9095;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    .item{
      a{
        display: flex;
        justify-content: space-between;
        width: 100%;
        text-decoration: none;
        color:white;
      }
      margin-bottom: 0.5rem;
      cursor: pointer;
      text-align: left;
      border-bottom: 1px #eee solid;
      padding:0.5rem 0;
      
    }
    .head{
      #file{
        outline: none;
        visibility: hidden;
      }
      .show-img{
        display: inline-block;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border:1px white solid;
        border-radius: 50px;
        cursor: pointer;
      }
    }
  }
</style>