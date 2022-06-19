import axios from './axios'

export function getDiscoveryIcon() {
  return axios.get('/homepage/dragon/ball')
}
export function getDiscoveryDatas() {
  return axios.get('/homepage/block/page')
}
export function getRecommendSongs() {
  return axios.get('/recommend/resource')
}
export function getBanners() {
  return axios.get('/banner', {
    params: { type: 2 },
  })
}
