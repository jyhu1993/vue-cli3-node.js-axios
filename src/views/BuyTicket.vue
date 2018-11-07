<template>
  <div id="buy-ticket">
    <header class="head">
      <div class="current-location">当前位置:{{location}}</div>
      <router-link to='/home'>返回首页</router-link>
    </header>
    <div id="map-container"></div>
    <p class="select-cinema">请选择附近的影城：</p>
    <div class="cinema" @click='selectCinema' v-html='cinemaInfo'></div>
    <div class="buy">
      <table>
        <tr>
          <th colspan="4">影院:{{cinemaName}}</th>
        </tr>
        <tr>
          <td>影片介绍</td>
          <td>时间</td>
          <td>数量</td>
          <td>单价</td>
        </tr>
        <tr>
          <td class="movie-intro"><img :src="currentBuyTicketMovie.url"></td>
          <td>
            <select v-model='selectedTime'>
              <option disabled value="">请选择</option>
              <option v-for='time in startTime' :key='time'>{{time}}</option>
            </select>
          </td>
          <td class="ticketNum"><span @click='decrementCount'>-</span>{{count}}<span @click='incrementCount'>+</span></td>
          <td class="price">￥{{price}}</td>
        </tr>
        <tr>
          <td class="total-price" colspan="4">
          总价:{{totalPrice}}
          <button @click='submitOrder'>提交订单</button>
          </td>
        </tr>
      </table>
    </div>
    <footer class="foot">buy your ticket</footer>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      location: '',
      cinemaInfo: '',
      count: 1,
      price: 34.99,
      cinemaName: '',
      startTime: ['12月2日 15：30', '12月4日 13：30'],
      selectedTime: ''
    }
  },
  computed: {
    totalPrice () {
      return this.count * this.price
    },
    // 获取当前购票movie信息
    currentBuyTicketMovie () {
      return this.$store.state.currentBuyTicketMovie
    }
  },
  methods: {
    // 改变count的值；
    incrementCount () {
      this.count++
    },
    decrementCount () {
      this.count--
    },
    // 创建地图；
    createMap () {
      // 通过IP定位
      let map = new BMap.Map('map-container')
      let point = new BMap.Point(116.404, 39.915)
      let that = this
      map.centerAndZoom(point, 12)
      var geolocation = new BMap.Geolocation()
      map.enableScrollWheelZoom(true)
      function myFun (result) {
        var cityName = result.name
        map.setCenter(cityName)
        that.location = cityName
        // 检索电影院
        let options = {
          onSearchComplete: function (results) {
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              // 判断状态是否正确
              let s = ''
              for (let i = 0; i < results.getCurrentNumPois(); i++) {
                s += `<p class='each-cinema'><span class='name'>${results.getPoi(i).title}</span><br><span class='address'>地址:${results.getPoi(i).address}</span></p>`
              }
              that.cinemaInfo = s
            }
          },
          renderOptions: {
            map: map,
            panel: 'results'
          }
        }
        let local = new BMap.LocalSearch(cityName, options)
        local.search('电影院')
      }
      var myCity = new BMap.LocalCity()
      myCity.get(myFun)
    },
    // 点击选择影院
    selectCinema (e) {
      switch (e.target.className) {
        case 'address': return false
          break
        case 'name': this.cinemaName = e.target.innerText
          break
        case 'each-cinema': this.cinemaName = e.target.firstChild.innerText
      }
    },
    // 提交订单；
    submitOrder () {
      if (this.cinemaName === '' || this.selectedTime === '') {
        alert('请选择电影院和时间')
      } else {
        axios({
          method: 'post',
          url: 'http://192.168.3.6:1234/submitOrder',
          data: JSON.stringify({
            cinema: this.cinemaName,
            user: this.$store.state.userName,
            movie: this.$store.state.currentBuyTicketMovie,
            time: this.selectedTime,
            eachPrice: this.price,
            totalPrice: this.totalPrice,
            number: this.count
          })
        })
        alert('订单提交成功')
      }
    }
  },
  mounted () {
    this.createMap()
  }
}
</script>
<style lang="less">
  #buy-ticket{
    .head{
      height: 60px;
      line-height: 60px;
      display: flex;
      background-color: #1b9095;
      justify-content: space-between;
      align-items: space-between;
      .current-location,a{
        color:white;
        padding:0 1rem;
        text-decoration: none;
      }
    }
    .select-cinema{
      text-align: left;
      padding:1rem 0.5rem 0 0.5rem;
    }
    .cinema{
      margin:0.5rem 0;
      height: 200px;
      overflow-y: scroll;
      border:#eee solid 1px;
      .each-cinema{
        text-align: left;
        padding:0.5rem;
        .name{
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
        }
        .address{
          font-size: 0.5rem;
        }

        &:hover{
          background-color: #eee;
        }
        &:active{
          background-color: #1b9095;
          color:white;
        }
      }
    }
    #map-container{
      height: 200px;
    }
    .buy{
      table{
        width: 100%;
        th,td{
          padding:0.5rem;
          vertical-align: middle;
        }
        tr,th,td{
          border:1px solid #eee;
        }
        .total-price{
          text-align: right;
          button{
            outline: none;
            background-color:#1b9095;
            color:white;
            border:1px solid #eee;
            border-radius: 3px;
            cursor: pointer;
          }
        }
        .movie-intro{
          width: 30%;
          height: 100px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .ticketNum{
          span{
            border:1px solid #eee;
            display: inline-block;
            width: 12px;
            cursor: pointer;
            margin:0 10px;
            &:active{
              background-color:  #1b9095;
              color:white;
            }
          }
        }
      }
    }
    .foot{
      height: 60px;
      line-height: 60px;
      background-color: #1b9095;
      color:white;
    }
  }
</style>
