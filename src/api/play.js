import axios from './axios'
export function getSongsDetail(ids) {
  return axios.get(`/song/detail?ids=${ids}`)
}
export function getSongLyrics(id) {
  return axios.get('/lyric', {
    params: { id: id },
  })
}
export function playSongs(id) {
  return axios.get('/song/url', {
    params: { id: id },
  })
}
