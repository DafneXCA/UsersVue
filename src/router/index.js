// Composables
import UsersCreateVue from '@/views/Users/UsersCreate.vue'
import UsersEditVue from '@/views/Users/UsersEdit.vue'


import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/users',
        name: 'Create',
        component: UsersCreateVue,
      },
      {
        path: '/users/:id/edit',
        name: 'Edit',
        component: UsersEditVue,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
