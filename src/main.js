import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import {routes} from "./routes";
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'

axios.defaults.baseURL = 'http://localhost:8001'

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
