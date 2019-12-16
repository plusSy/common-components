export default [
  {
    path: '*',
    redirect: {
        name: 'Hello'
    }
  },
  {
      path: '/',
      name: 'Hello',
      component: () => import('@templates/HelloWorld.vue')
  }
]
