const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { keepAlive: true },
    children: [
      { path: '', component: () => import('pages/Multisend.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]
export default routes
