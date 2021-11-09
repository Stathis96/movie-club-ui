import { route } from 'quasar/wrappers'
import { authService } from 'src/boot/auth'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, _from, next) => {
    if (to.path === '/login') {
      authService.handleLoginRedirect()
        .then(() => {
          next('/movies')
        })
        .catch(error => {
          console.log(error)
          next('/')
        })
    } else if (to.path === '/') {
      next()
    } else {
      authService.getProfile().then(response => {
        console.log('res', response)
        // localStorage.setItem('user', response)
        store.dispatch('user/add_user', response)
        authService.getAccessToken()
          .then(token => {
            console.log('token', token)
            localStorage.setItem('token', token)
          })
        if (response) {
          next()
        } else {
          next('/')
        }
      })
    }
  })

  return Router
})

// 2nd way
// Router.beforeEach((to, _from, next) => {
//   if (to.path === '/') {
//     authService.isUserLoggedIn().then(response => {
//       if(!response) authService.login()
//     })
//   }
//   else if (to.path === '/login') {
//     authService.handleLoginRedirect()
//       .then(() => {
//         next('/movies')
//       })
//       .catch(error => {
//         console.log(error)
//         next('/')
//       })
//   } else {
//     authService.getProfile().then(response => {
//       store.dispatch('loggedUser/setUser', response)
//       authService.getAccessToken()
//         .then(token => {
//           localStorage.setItem('token', token)
//         })
//       if (response) {
//         next()
//       } else {
//         next('/')
//       }
//     })
//   }
// })

// return Router
// })
