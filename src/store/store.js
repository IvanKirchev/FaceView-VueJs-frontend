import Vuex from 'vuex'
import Vue from 'vue'
import AuthViewModule from './modules/authView'
import AuthModule from './modules/auth'
import SearchedUser from './modules/searchedUser'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:[
    AuthViewModule,
    AuthModule,
    SearchedUser
  ]
});
