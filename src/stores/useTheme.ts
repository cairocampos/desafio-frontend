import { defineStore } from "pinia"
import { ref, watch } from "vue"

type Themes = 'dark' | 'light'

export const useTheme = defineStore('theme', () => {
  const theme = ref<Themes>('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    handleHtmlAttribute()
  }

  watch(theme, () => {
    setThemeOnStorage(),
    handleHtmlAttribute();
  })

  const setThemeOnStorage = () => {
    localStorage.setItem('@Rockstream:theme', theme.value)
  }

  const handleHtmlAttribute = () => {
    if(theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setInitialTheme = () => {
    const storageTheme = localStorage.getItem('@Rockstream:theme') as Themes || theme.value;
    if(['dark', 'light'].includes(storageTheme)) {
      theme.value = storageTheme;
    }
    handleHtmlAttribute();
  }

  return {
    toggleTheme,
    setInitialTheme,
    theme
  }
})