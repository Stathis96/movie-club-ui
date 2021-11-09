
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'movies', component: () => import('pages/Movies.vue') },
      { path: 'users', component: () => import('pages/Users.vue') },
      { path: 'rentals', component: () => import('pages/Rental.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
