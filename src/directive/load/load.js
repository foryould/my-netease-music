import './load.scss'

function loading(el, binding) {
  el.style.position = 'relative'
  if (!el.loading) {
    const div = document.createElement('div')
    el.loading = div
    div.className = 'mt-loading'
    const i = document.createElement('i')
    i.className = 'iconfont'
    i.innerHTML = '&#xe891;'
    div.appendChild(i)
    el.appendChild(div)
  }
  if (binding.value) {
    el.loading.style.display = 'flex'
  } else {
    el.loading.style.display = 'none'
  }
}

export default {
  inserted(el, binding) {
    loading(el, binding)
  },
  update(el, binding) {
    loading(el, binding)
  },
}
