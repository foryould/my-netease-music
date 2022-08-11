import axios from './axios'

export function getsearchContent(keywords, type, limit, offset) {
  return axios.get('/cloudsearch', {
    params: { keywords, type, offset },
  })
}

export function getSearchSuggest(keywords, type) {
  return axios.get('/search/suggest', {
    params: { keywords, type },
  })
}

export function getSearchDefault() {
  return axios.get('/search/default')
}

export function getSearchHot() {
  return axios.get('/search/hot')
}

export function getSearchDetail() {
  return axios.get('/search/hot/detail')
}
