export function formatTime(time) {
  const regMin = /.*:/
  const regSec = /:.*\./
  let min = parseInt(time.match(regMin)[0].slice(0, 2))
  let sec = parseInt(time.match(regSec)[0].slice(1, 3))
  let ms = parseInt(time.split('.')[1])
  return (min * 60 + sec) * 1000 + ms
}
