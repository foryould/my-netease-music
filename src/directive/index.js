export default {
  install(Vue) {
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus()
      },
    })
  },
}
