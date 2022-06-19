import './toast.scss'

const div = document.createElement('div')
document.body.appendChild(div)
div.className = 'toast'
let timer
export default function (text, duration = 1500) {
  clearTimeout(timer)
  div.innerText = text
  div.style.display = 'block'
  timer = setTimeout(() => {
    div.style.display = 'none'
  }, duration)
}
