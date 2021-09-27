import { createRouter, createWebHistory } from 'vue-router'
import index    from '../views/index.vue'
import Home     from '../views/Home.vue'
import About    from '../views/About.vue'
import Login    from '../views/Login.vue'
import SignUp   from '../views/SignUp.vue'
import account  from '../views/user/account.vue'
import accountEditor from '../views/user/accountEditor.vue'
import diaries  from '../components/Diaries.vue'
import editor   from '../components/Editor.vue'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: index,
    children: [
      { path: 'home', name: 'home', component: Home, meta: { title: 'Home - 그림일기' } },
      { path: 'about', name: 'about', component: About, meta: { title: 'About - 그림일기' } },
      { path: '/account', name: 'account', component: account, meta: { requiredAuth: true } },
      { path: '/account/editor', name: 'accountEditor', component: accountEditor, meta: { requiredAuth: true } },
      { path: '/diaries', name: 'diaries', component: diaries, meta: { requiredAuth: true } },
      { path: '/editor', name: 'editor', component: editor, meta: { requireAuth: true } }
    ]
  },

  { path: '/login', name: 'login', component: Login, meta: { title: 'Login - 그림일기' } },
  { path: '/sign-up', name: 'signUp', component: SignUp, meta: { title: 'Sign Up - 그림일기' } }
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
