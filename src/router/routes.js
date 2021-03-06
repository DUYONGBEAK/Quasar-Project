
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/signUp', component: () => import('pages/SignUp.vue') },
      { path: '/findPw', component: () => import('pages/FindPw.vue') },
      { path: '/main', component: () => import('pages/Main.vue') },
      { path: '/myinfo', component: () => import('pages/Myinfo.vue') }
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
