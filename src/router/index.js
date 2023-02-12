import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingView from '../views/SettingView.vue'
import LoginView from '../views/LoginView.vue'
import SearchView from '../views/SearchView.vue'
import ProfilView from '../views/ProfilView.vue'
import AddView from '../views/AddView.vue'
import ActivityView from '../views/ActivityView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { RequiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
    meta: { RequiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    meta: { RequiresAuth: true }
  },
  {
    path: '/add',
    name: 'add',
    component: AddView,
  },
  {
    path: '/activity',
    name: 'activity',
    component: ActivityView,
    meta: { RequiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let connectionInfo = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.RequiresAuth)) {
    if (connectionInfo == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }

})

export default router
