import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/index.vue'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import login from '@/views/user/login.vue'
import signUp from '@/views/user/signUp.vue'
import info from '@/views/user/info.vue'
import userEdit from '@/views/user/userEdit.vue'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: index,
    children: [
      { path: 'home', name: 'home', component: Home, meta: { requiredAuth: false } },
      { path: 'about', name: 'about', component: About, meta: { requiredAuth: false } }
    ]
  },

  { path: '/login', name: 'login', component: login, meta: { requiredAuth: false } },
  { path: '/sign-up', name: 'signUp', component: signUp, meta: { requiredAuth: false } },
  { path: '/user/info', name: 'info', component: info, meta: { requiredAuth: true } },
  { path: '/user/edit', name: 'userEdit', component: userEdit, meta: { requiredAuth: true } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
