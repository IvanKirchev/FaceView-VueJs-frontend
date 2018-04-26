import Vue from  'vue'
import Home from './components/Home.vue'
import AuthHome from './components/auth/AuthHome.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import User from './components/users/User.vue'
import Profile from './components/auth/Profile.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter(to, from, next){
      if(store.getters.isAuth || localStorage.getItem('token')){
        next('/home')
      }else{
        next()
      }
    }
  },
  {
    path: '/home',
    component: AuthHome,
    beforeEnter(to, from, next){
      if(store.getters.isAuth || localStorage.getItem('token')){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path: '/users/:id',
    component: User,
    beforeEnter(to, from, next){
      store.dispatch('tryAutoLogin')
      if(to.params.id === store.getters.getUserId ){
        next("/profile")
      }
      store.dispatch('refreshSearchUser', to.params.id).then(() => {
        next()
      })
    }
  },
  {
    path: '/profile',
    component: Profile,
  }
]
