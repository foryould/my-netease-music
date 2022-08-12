import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '@/views/LoginPage'
import PlayingPage from '@/views/play/PlayingPage.vue'
import SearchPage from '@/views/search/SearchPage.vue'
import SongListDetail from '@/views/song/SongListDetail.vue'
import AlbumListDetail from '@/views/album/AlbumListDetail.vue'
import ATest from '@/views/ATest.vue'
import { getToken } from '@/utils/auth'

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
    path: '/playing',
    name: 'PlayingPage',
    component: PlayingPage,
  },
  {
    path: '/searching',
    name: 'SearchPage',
    component: SearchPage,
  },
  {
    path: '/songing',
    name: 'SongListDetail',
    component: SongListDetail,
  },
  {
    path: '/albuming',
    name: 'AlbumListDetail',
    component: AlbumListDetail,
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
  if (to.path !== '/login' && !isAuthenticated) next({ path: '/login' })
  else next()
})

export default router
