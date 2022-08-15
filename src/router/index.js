import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '@/views/LoginPage'
import SearchPage from '@/views/search/SearchPage.vue'
import SongListDetail from '@/views/song/SongListDetail.vue'
import AlbumListDetail from '@/views/album/AlbumListDetail.vue'
import SingerDetail from '@/views/singer/SingerDetail.vue'
import ATest from '@/views/ATest.vue'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { noAuth: true },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { noAuth: true },
  },
  {
    path: '/searching',
    name: 'SearchPage',
    component: SearchPage,
    meta: { noAuth: true },
  },
  {
    path: '/songing',
    name: 'SongListDetail',
    component: SongListDetail,
    meta: { noAuth: true },
  },
  {
    path: '/albuming',
    name: 'AlbumListDetail',
    component: AlbumListDetail,
    meta: { noAuth: true },
  },
  {
    path: '/singer',
    name: 'SingerDetail',
    component: SingerDetail,
    meta: { noAuth: true },
  },
  {
    path: '/test/:id',
    name: 'ATest',
    component: ATest,
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken()
  if (!to.meta.noAuth && !isAuthenticated) next({ path: '/login' })
  else next()
})

export default router
