import { numberFormat, countFormat, dateFormat } from '@/utils/index'

const filter = { numberFormat, countFormat, dateFormat }

export default {
  install(Vue) {
    Object.keys(filter).forEach((key) => {
      Vue.filter(key, filter[key])
    })
  },
}
