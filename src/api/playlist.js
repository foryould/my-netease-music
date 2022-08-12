import axios from './axios'

export function getSongListDetail(id) {
  return axios.get('/playlist/detail/dynamic', {
    params: { id },
  })
}

export function getSongTrack(id) {
  return axios.get('/playlist/track/all', {
    params: { id },
  })
}

export function getPlayListDetail(id) {
  return axios.get('/playlist/detail', {
    params: { id },
  })
}
