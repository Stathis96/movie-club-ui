import { api } from 'src/boot/axios'

export function AbstractStore (url = '') {
  return {
    namespaced: true,
    state: () => {
      return {
        data: [],
        loading: 0
      }
    },
    mutations: {
      SET_DATA (state, payload) {
        console.log(payload)
        state.data = payload
      },
      ADD_ITEM (state, payload) {
        state.data.push(payload)
        // console.log('PAYLOAD', payload)
      },
      EDIT_ITEM (state, payload) { // payload: { id, data: { title... } }
        const index = state.data.findIndex(item => item.id === payload.id)
        state.data[index] = { ...payload.data, id: payload.id }
      },
      REMOVE_ITEM (state, id) {
        const index = state.data.findIndex(item => item.id === id)
        state.data.splice(index, 1)
      },
      ADD_TOLOADER (state) {
        state.loading += 1
      },
      REMOVE_FROMLOADER (state) {
        state.loading -= 1
      }
    },
    actions: {
      fetch_data ({ commit }) {
        commit('ADD_TOLOADER')
        return api.get(url)
          .then(response => {
            console.log(response.data)
            commit('SET_DATA', response.data)
            return response.data
          })
          .finally(() => commit('REMOVE_FROMLOADER'))
      },
      create_item ({ commit }, payload) {
        commit('ADD_TOLOADER')
        return api.post(url, payload)
          .then(response => {
            commit('ADD_ITEM', response.data)
            // console.log('Response', response)
            // console.log('ResponseDATA', response.data)
            return response
          }).catch(error => {
            console.log(error)
          })
          .finally(() => commit('REMOVE_FROMLOADER'))
      },
      update_item ({ commit }, payload) {
        commit('ADD_TOLOADER')
        return api.put(`${url}/${payload.id}`, payload.data)
          .then(response => {
            commit('EDIT_ITEM', { id: payload.id, data: response.data })
            return response
          })
          .finally(() => commit('REMOVE_FROMLOADER'))
      },
      delete_item ({ commit }, id) {
        commit('ADD_TOLOADER')
        return api.delete(`${url}/${id}`)
          .then(response => {
            commit('REMOVE_ITEM', id)
            return response
          })
          .finally(() => commit('REMOVE_FROMLOADER'))
      }
    },
    getters: {
      getAllItems (state) {
        return state.data
      },
      getCurrentStatus (state) {
        return state.loading
      }
    }
  }
}
