import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '@/views/LoginPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes,
})

export default router
