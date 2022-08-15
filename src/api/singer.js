import axios from './axios'

export function getSingerDetail(id) {
  return axios.get('/artist/detail', {
    params: { id },
  })
}
