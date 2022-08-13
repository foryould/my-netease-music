import Vue from 'vue'
import Vuex from 'vuex'
import { playing } from './play.js'
import { getLoginState } from '@/api/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: undefined,
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async init(ctx) {
      try {
        const data = await getLoginState()
        ctx.commit('setUserInfo', data.data.profile)
      } catch (e) {
        console.error(e)
      }
    },
  },
  modules: { playing },
})
