import Icon from './Icon.vue'

const components = {
  Icon,
}

export default {
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key])
    })
  },
}
