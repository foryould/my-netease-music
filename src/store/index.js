import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from '@/utils/auth'
import { playing } from './play.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getUser(),
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {},
  modules: { playing },
})
