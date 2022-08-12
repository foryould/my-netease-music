import Icon from './Icon.vue'
import MtLyric from './MtLyric.vue'

const components = {
  Icon,
  MtLyric,
}

export default {
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key])
    })
  },
}
