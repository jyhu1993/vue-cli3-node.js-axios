import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({ // eslint-disable-line
  router,
  store,
  render: h => h(App),
  methods: {
    // 判断用户是否登录，防止用户通过手动修改url，进入路由
    judgeLogin () {
      let isLogin = store.state.token
      if (!isLogin) {
        return this.$router.push('/login')
      }
    }
  },
  created () {
    this.judgeLogin()
  }
}).$mount('#app')
