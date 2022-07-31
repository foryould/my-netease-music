import Axios from 'axios'
import router from '@/router/index'
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30 * 1000,
})
axios.interceptors.request.use((config) => {
  config.params = { ...config.params, _f: parseInt(Math.random() * 10) }
  return config
})
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    if (error.response && error.response.status === 301) {
      router.push('/login')
    }
  }
)
export default axios
