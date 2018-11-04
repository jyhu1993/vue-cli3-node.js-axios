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
    numOfCollectMovie: 0
  },
  mutations: {

  },
  actions: {

  }
})
