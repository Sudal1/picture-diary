import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

import index         from '../views/index.vue'
import Home          from '../views/Home.vue'
import login         from '../views/user/login.vue'
import signUp        from '../views/user/signUp.vue'
import account       from '../views/user/account.vue'
import accountEditor from '../views/user/account.editor.vue'
import diary         from '../views/diary/diary.vue'
import diaries       from '../views/diary/diaries.vue'
import diaryEditor   from '../views/diary/diary.editor.vue'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: index,
    children: [
      { path: 'home', name: 'home', component: Home, meta: { title: 'Home' } },
      { path: '/account', name: 'account', component: account, meta: { title: 'Account' } },
      { path: '/account/editor', name: 'accountEditor', component: accountEditor, meta: { title: 'Account Editor' } },
      { path: '/diaries', name: 'diaries', component: diaries, meta: { title: 'Diaries' } },
      { path: '/diaries/:id', name: 'diary', component: diary },
      { path: '/editor', name: 'editor', component: diaryEditor }
    ]
  },

  { path: '/login', name: 'login', component: login, meta: { title: 'Login' } },
  { path: '/sign-up', name: 'signUp', component: signUp, meta: { title: 'Sign Up' } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  if (sessionStorage.getItem('user') && !store.state.user.nickname) {
    const res = await store.dispatch('getAccount', sessionStorage.getItem('user'))
    console.log(res)
    store.commit('setUserInfo', res.data.result)
  }
  if (store.state.status.loggedIn && (to.name === 'login' || to.name === 'signUp')) {
    next({ name: 'diaries' })
  } else if (!store.state.status.loggedIn && to.meta.requiredAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
