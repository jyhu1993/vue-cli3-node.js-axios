<template>
  <div id="order-page">
    <div class="item"  v-for='(order,index) in orders' :key='index'>
      <table>
        <tr>
          <th colspan='4'>{{order.cinema}}</th>
        </tr>
        <tr>
          <td>影片</td>
          <td>时间</td>
          <td>数量</td>
          <td>单价</td>
        </tr>
        <tr>
          <td class="movie"><img :src="order.movie.url"></td>
          <td>{{order.time}}</td>
          <td>{{order.number}}</td>
          <td>￥{{order.eachPrice}}</td>
        </tr>
        <tr>
          <td colspan="4">订单总价：{{order.totalPrice}}</td>
        </tr>
      </table>
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
    orders () {
      return this.$store.state.orders
    }
  }
}
</script>
<style lang="less" scoped>
  #order-page{
    .item{
      margin:0.5rem;
      table{
        width: 100%;

        th,td{
          border:1px solid #eee;
          vertical-align: middle;
          padding:0.5rem;
        }
        .movie{
          width: 30%;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
