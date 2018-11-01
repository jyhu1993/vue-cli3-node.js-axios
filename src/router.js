import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: Login,
      children: [
        {
          path: '',
          redirect: 'loginIn'
        },
        {
          path: 'loginIn',
          component: () => import('./components/Login-in.vue')
        },
        {
          path: 'signUp',
          component: () => import('./components/Sign-up.vue')
        }]
    }
  ]
})
