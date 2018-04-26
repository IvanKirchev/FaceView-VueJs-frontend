import axios from "axios";

const state = {
  searchUsername: null,
  searchProfilePicUrl: null,
  searchCoverPicUrl: null,
  searchAge: null,
  searchTown: null,
  searchPosts: [],
  searchFriends: null,
  searchAbout: null
}

const mutations = {
  'fillSearchUser': (state, {username, profilePic, coverPic, town, age, about}) => {
    state.searchProfilePicUrl = profilePic
    state.searchCoverPicUrl = coverPic
    state.searchAge = age
    state.searchTown = town
    state.searchUsername = username
    state.searchAbout = about
  },
  'fillPosts': (state, data) => {
    state.searchPosts = data
  }
}

const actions = {
  refreshSearchUser({commit, state, rootGetters}, id) {
    console.log(rootGetters)
    axios.get("/users/" + id, {headers: {'Authorization': rootGetters.isAuth}}).then((res) => {
      commit('fillSearchUser', res.data)
    })
  },
  loadPosts({commit, state, rootGetters}, id){
    axios.get("/posts/all/" + id,
      {headers: {'Authorization': rootGetters.isAuth}})
      .then(res => {
        console.log('filling posts')
        commit('fillPosts', res.data)
      })
  }

}

const getters = {
  getInfo(state){
    return {
      searchUsername: state.searchUsername,
      searchProfilePicUrl: state.searchProfilePicUrl,
      searchCoverPicUrl: state.searchCoverPicUrl,
      searchAge: state.searchAge,
      searchTown: state.searchTown,
      searchPosts: state.searchPosts,
      searchAbout: state.searchAbout
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
