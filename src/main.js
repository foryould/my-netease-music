import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/style/index.scss'

import Components from '@/components'

Vue.config.productionTip = false
Vue.use(Vant)

Vue.use(Components)
document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
window.addEventListener('resize', () => {
  document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
