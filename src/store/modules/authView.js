const state = {
  authView: 'app-register'
};

const mutations = {
  'AuthView': (state, view) => {
    state.authView = view
  }
};

const actions = {
  changeAuthView({commit}, view) {
    commit('AuthView', view)
  }
};

const getters = {
  authView(state) {
    return state.authView
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
