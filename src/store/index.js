import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from '@/utils/auth'

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
  modules: {},
})
