import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SearchView from '../views/SearchView.vue'
import ProfilView from '../views/ProfilView.vue'
import AddView from '../views/AddView.vue'
import ActivityView from '../views/ActivityView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfilReadView from '../views/ProfilReadView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
  {
    path: '/profil/:id',
    name: 'profilRead',
    component: ProfilReadView,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

import { registerWebSocket } from "../pusher-config";
router.beforeEach((to, from, next) => {
  let connectionInfo = localStorage.getItem('user');
  if (connectionInfo !== 'undefined') {
    registerWebSocket();
    window.connectionInfo = JSON.parse(connectionInfo);
  }
  if (to.matched.some(record => record.meta.RequiresAuth)) {
    if (connectionInfo == 'undefined' || connectionInfo == null) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }

})

export default router
