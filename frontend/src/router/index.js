import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

import index         from '../views/index.vue'
import Home          from '../views/Home.vue'
import About         from '../views/About.vue'
import login         from '../views/user/login.vue'
import signUp        from '../views/user/signUp.vue'
import account       from '../views/user/account.vue'
import accountEditor from '../views/user/account.editor.vue'
import diaries       from '../views/diary/diaries.vue'
import diaryEditor   from '../views/diary/diary.editor.vue'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: index,
    children: [
      { path: 'home', name: 'home', component: Home, meta: { title: 'Home' } },
      { path: 'about', name: 'about', component: About, meta: { title: 'About' } },
      { path: '/account', name: 'account', component: account, meta: { title: 'Account' } },
      { path: '/account/editor', name: 'accountEditor', component: accountEditor, meta: { title: 'Account Editor' } },
      { path: '/diaries', name: 'diaries', component: diaries, meta: { title: 'Diaries' } },
      { path: '/editor', name: 'editor', component: diaryEditor, meta: { title: 'Diary Editor' } }
    ]
  },

  { path: '/login', name: 'login', component: login, meta: { title: 'Login' } },
  { path: '/sign-up', name: 'signUp', component: signUp, meta: { title: 'Sign Up' } }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (store.state.user.token && (to.name === 'login' || to.name === 'signUp')) {
    next({ name: 'diaries' })
  } else if (!store.state.user.token && to.meta.requiredAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
