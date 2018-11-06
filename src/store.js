import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为检测是否登录设置token;
    token: false,
    // 保存已登录用户的用户名，以便全局使用；
    userName: '',
    wantWatchMovies: []
  },
  mutations: {
    // 改变token的状态
    changeToken (state) {
      state.token = true
    },
    // 对收藏的电影进行+1或-1操作；
    incrementWantWatchMovie (state, movie) {
      state.wantWatchMovies.push(movie)
    },
    decrementWantWatchMovie (state, movie) {
      let index = state.wantWatchMovies.indexOf(movie)
      state.wantWatchMovies.splice(index, 1)
    },
    // 初始化想看的影片
    initWantWatchMovies (state, arr) {
      state.wantWatchMovies = arr
    }
  },
  actions: {

  }
})
