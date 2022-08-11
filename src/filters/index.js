import { numberFormat } from '@/utils/index'

const filter = { numberFormat }

export default {
  install(Vue) {
    Object.keys(filter).forEach((key) => {
      Vue.filter(key, filter[key])
    })
  },
}
