import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import Filters from '@/filters/index'
import Directives from '@/directive/index'

import Components from '@/components'

Vue.config.productionTip = false

Vue.use(Components)
Vue.use(Filters)
Vue.use(Directives)
document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
window.addEventListener('resize', () => {
  document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
