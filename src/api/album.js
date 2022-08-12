import axios from './axios'

export function getAlbumDynamic(id) {
  return axios.get('/album/detail/dynamic', {
    params: { id },
  })
}

export function getAlbum(id) {
  return axios.get('/album', {
    params: { id },
  })
}
