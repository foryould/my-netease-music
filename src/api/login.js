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

// 获取登录状态
export function getLoginState() {
  return axios.get('/login/status')
}

// 退出登录
export function logout() {
  return axios.get('/logout')
}
