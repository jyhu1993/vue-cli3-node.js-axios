<template>
  <aside id="aside">
    <div class="head">
      <label for="file"><img class="show-img" :src="url" title="点击更换头像"></label>
      <input @change='uploadImage' type="file" id="file" name="pic" value="" accept="image/*">
    </div>
    <div class="item">我的订单({{order}})<span>></span></div>
    <div class="item">我的收藏({{collect}})<span>></span></div>
  </aside>
</template>
<script>
  export default {
    data () {
      return {
        url:require('../assets/images/movie/01.jpg'),
        order:0,
        collect:this.$store.state.numOfCollectMovie
      }
    },
    methods:{
      uploadImage (e) {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        let that = this
        reader.onload = function(){
          that.url = this.result
        }
      }
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
      margin-bottom: 0.5rem;
      color:white;
      cursor: pointer;
      text-align: left;
      border-bottom: 1px #eee solid;
      padding:0.5rem 0;
      display: flex;
      justify-content: space-between;
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