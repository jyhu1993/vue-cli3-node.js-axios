import Vue from 'vue'
import Router from 'vue-router'
import LoginIn from './views/Login-in.vue'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/loginIn'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/loginIn',
      name: 'loginIn',
      component: LoginIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Sign-up.vue')
    }
  ]
})
