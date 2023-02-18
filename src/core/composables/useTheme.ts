import { ref } from "vue"

type Themes = 'dark' | 'light'

export default function useTheme() {
  const theme = ref<Themes>('dark')
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  }

  const setInitialTheme = () => {
    if(theme.value === 'dark') {
      document.documentElement.classList.add('dark')
      return;
    }

    document.documentElement.classList.remove('dark')
  }

  return {
    toggleTheme,
    setInitialTheme,
    theme
  }
}