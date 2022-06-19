const themes = ['dark', 'light']

export function setTheme(theme) {
  if (themes.includes(theme)) {
    document.querySelector('html').dataset.theme = theme
  }
}
