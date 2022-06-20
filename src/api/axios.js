import Axios from 'axios'
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30 * 1000,
})
axios.interceptors.request.use((config) => {
  config.params = { ...config.params, _f: parseInt(Math.random() * 10) }
  return config
})
axios.interceptors.response.use((res) => {
  return res.data
})
export default axios
