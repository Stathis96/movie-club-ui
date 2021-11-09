// import { api } from 'src/boot/axios'

// export const movies = {
//   namespaced: true,
//   state: () => {
//     return {
//       data: [
//       ]

//     }
//   },
//   getters: { // put sychronous functions for changing state e.g. add, edit, delete
//     getAllMovies (state) {
//       return state.data
//     }
//   },
//   mutations: {
//     SET_MOVIE (state, data) {
//       state.data = data
//     },
//     ADD_MOVIE (state, data) {
//       state.data.push(data)
//     },
//     EDIT_MOVIE (state, data) {
//       state.data.push(data)
//     },
//     REMOVE_MOVIE (state, dataToRemove) {
//       state.data = state.data.filter(
//         data => data.id !== dataToRemove.id
//       )
//     }
//   },
//   actions: { // put asynchronous functions that can call one or more mutation functions
//     addMovie ({ commit }, data) {
//       api.post('movies', { data })
//         .then(response => {
//           commit('ADD_MOVIE', data)
//         })
//       console.log('Action', data)
//     },
//     removeMovie ({ commit }, dataToRemove) {
//       commit('REMOVE_MOVIE', dataToRemove)
//     },
//     fetchMovies ({ commit }) {
//       api.get('./movies')
//         .then(response => {
//           commit('SET_MOVIE', response.data)
//         })
//     }
//   }
// }
