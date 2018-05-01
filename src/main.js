import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import {routes} from "./routes";
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'

axios.defaults.baseURL = ' https://faceview.scalingo.io'

Vue.use(Vuelidate)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
