import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为检测是否登录设置token;
    token: false,
    // 保存已登录用户的用户名，以便全局使用；
    userName: '',
    // 为收藏的电影计数
    numOfCollectMovie: 0,
    wantWatchMovies: Array
  },
  mutations: {
    // 改变token的状态
    changeToken (state) {
      state.token = true
    },
    // 对收藏的电影进行+1或-1操作；
    increment (state, n) {
      state.numOfCollectMovie += n
    },
    decrement (state, n) {
      state.numOfCollectMovie -= n
    },
    // 改变numOfCollectMovie的初始值；
    changeCollectMovie (state, n) {
      state.numOfCollectMovie = n
    },
    //
    changeWantWatchMovies (state, arr) {
      state.wantWatchMovies = arr
    }
  },
  actions: {

  }
})
