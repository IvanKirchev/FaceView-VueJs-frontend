import axios from 'axios'

const state = {
  token: null,
  userId: null,
  username: null,
  loginErrorMsg: null,
  profilePicUrl: null,
  coverPicUrl: null,
  age: null,
  town: null,
  about: null,
  friends: [],
  gallery: null,
  photos: []
}

const mutations = {
  'authUser': (state, {token, userId}) => {
    state.token = token
    state.userId = userId
    state.loginErrorMsg = null;
  },
  'loginError': (state, {message}) => {
    state.loginErrorMsg = message
  },
  'fillUser': (state, {age, profilePic, coverPic, town, username, about, gallery}) => {
    state.profilePicUrl = profilePic
    state.age = age;
    state.coverPicUrl = coverPic
    state.town = town
    state.username = username
    state.about = about
    state.gallery = gallery
  },
  'fillFriends': (state, data) => {
    state.friends = data
  },
  'fillPhotos': (state, data) => {
    state.photos = data
  }

}

const actions = {
  login({commit}, {username, password}) {
    return axios.post('/login', {username, password})
      .then(res => {

        let data = res.data;
        if (data.error) return data;
        let id = data['id'];
        let token = data['Authorization']
        let expirationDate = new Date(new Date().getTime() + Number.parseInt(data['expires']))

        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem("expiration", expirationDate)

        commit('authUser', {
          token,
          userId: id
        })

        axios.get("/users/" + id, {headers: {'Authorization': state.token}}).then((res) => {
          console.log('come on')
          commit('fillUser', res.data)
        })

      }).catch(err => {
        commit('loginError', {
          message: err.response.data.error.message
        })
      })
  },
  tryAutoLogin({commit, state}) {

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    console.log('auth.js', token, userId)
    if (!token || !userId) return
    if (new Date().getTime() > Date.parse(localStorage.getItem('expiration'))) {
      state.token = null
      localStorage.removeItem("token")
      localStorage.removeItem("expiration")
      localStorage.removeItem("userId")
      return
    }

    commit('authUser', {token, userId})
    axios.get("/users/" + userId, {headers: {'Authorization': state.token}}).then((res) => {
      console.log('come on')
      commit('fillUser', res.data)
    })
  },
  logout({commit}) {
    commit('authUser', {
      token: null,
      userId: null
    })

    commit('fillUser', {
      username: null,
      profilePic: null,
      coverPic: null,
      age: null,
      town: null
    })

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  },
  refreshPic({commit, state}) {
    axios.get("/users/" + state.userId, {headers: {'Authorization': state.token}}).then((res) => {
      commit('fillUser', res.data)
    })
  },
  loadFriends({commit, state}) {
    axios.get("/users/" + state.userId + "/friends", {headers: {'Authorization': state.token}})
      .then((res) => {
        commit('fillFriends', res.data._embedded.users)
      })
  },
  loadGallery({commit, state}) {

    axios.get("/photos/all", {
      headers: {'Authorization': state.token}
    }).then(res => {
      commit('fillPhotos', res.data)
    })
  }

}

const getters = {
  isAuth(state) {
    return state.token
  },
  getLoginError(state) {
    return state.loginErrorMsg
  },
  getProfilePic(state) {
    return state.profilePicUrl
  },
  getCoverPic(state) {
    return state.coverPicUrl
  },
  getUserId(state) {
    return state.userId
  },
  getUsername(state) {
    return state.username
  },
  getAboutInfo(state) {
    return {
      age: state.age,
      town: state.town,
      about: state.about
    }
  },
  getFriends(state) {
    return state.friends
  },
  getPhotos(state){
    return state.photos
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
