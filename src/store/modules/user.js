export const user = {
  namespaced: true,
  state: () => {
    return {
      data: null
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.data = user
    },
    UNSET_USER (state, data) {
      state.data = data
    }
  },
  actions: {
    add_user ({ commit }, user) {
      commit('SET_USER', user)
    },
    remove_user ({ commit }, data) {
      commit('UNSET_USER', data)
    }
  },
  getters: {
    getUser (state) {
      return state.data
    }
  }
}
