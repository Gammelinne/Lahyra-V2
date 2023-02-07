import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingView from '../views/SettingView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let connectionInfo = localStorage.getItem('user');
  if(connectionInfo === null && to.name !== 'login') {
    next('/login');
  } else if (connectionInfo !== null && to.name === 'login') {
    next('/');
  }else {
    next();
  }

})

export default router
