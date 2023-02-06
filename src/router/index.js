import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingView from '../views/SettingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
    meta: { RequiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  /* Redirect to login page if not logged in and trying to access a restricted page */
  if (to.matched.some(record => record.meta.RequiresAuth)) {
    console.log('requiresAuth');
    const connectionInfo = localStorage.getItem('user');
    if (connectionInfo) {
      next()
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})

export default router
