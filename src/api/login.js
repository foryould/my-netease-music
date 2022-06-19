import axios from './axios'

export function getCode(phone) {
  return axios.post('/captcha/sent', null, {
    params: { phone },
  })
}
export function loginByCode({ phone, captcha }) {
  return axios.post('/login/cellphone', null, {
    params: { phone, captcha },
  })
}
