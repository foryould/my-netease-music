import loading from './load/load.js'
console.log(loading)
export default {
  install(Vue) {
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus()
      },
    }),
      Vue.directive('loading', loading)
  },
}
