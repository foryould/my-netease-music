import dayjs from 'dayjs'

export function formatTime(time) {
  const regMin = /.*:/
  const regSec = /:.*\./
  let min = parseInt(time.match(regMin)[0].slice(0, 2))
  let sec = parseInt(time.match(regSec)[0].slice(1, 3))
  let ms = parseInt(time.split('.')[1])
  return (min * 60 + sec) * 1000 + ms
}

export function numberFormat(value) {
  if (!value) return
  const s = value.toString()
  if (s.length <= 5) {
    return `${Number(s)}次`
  } else {
    value = (value / 10000).toFixed(1)
    return `${value}万次`
  }
}

export function countFormat(value) {
  if (value === 0) return value
  if (!value) return
  const s = value.toString()
  if (s.length <= 5) {
    return Number(s)
  } else {
    value = parseInt(value / 10000)
    return `${value}万`
  }
}
// 防抖
export function debounce(func, delay = 500) {
  let timer
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function dateFormat(date, format) {
  if (!date) return
  date = dayjs(date)
  return date.format(format || 'YYYY-MM-DD')
}
