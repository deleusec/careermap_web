import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: true as boolean,
    context: 'app' as 'app' | 'admin',
  }),
  getters: {
    theme(): 'dark' | 'light' {
      return this.dark ? 'dark' : 'light'
    },
    isDark(): boolean {
      return this.dark
    }
  },
  actions: {
    initialize(context: 'app' | 'admin' = 'app') {
      this.context = context
      const saved = localStorage.getItem(`theme-${this.context}`)

      if (saved) {
        this.dark = saved === 'dark'
      } else {
        // this.dark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.dark = false
      }

      this.applyTheme()
    },
    toggleTheme() {
      this.dark = !this.dark
      this.applyTheme()
    },
    applyTheme() {
      document.body.classList.toggle('dark', this.dark)
      localStorage.setItem(
        `theme-${this.context}`,
        this.dark ? 'dark' : 'light',
      )
    },
  },
})
