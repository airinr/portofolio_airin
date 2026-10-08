import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'porto-theme'

function systemTheme(): ThemeMode {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored(): ThemeMode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.style.colorScheme = mode
}

export const theme = ref<ThemeMode>(readStored() ?? systemTheme())

export function toggleTheme(): void {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export function initTheme(): void {
  applyTheme(theme.value)
  watch(theme, (mode) => {
    applyTheme(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
  })
  if (typeof window !== 'undefined' && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!readStored()) {
        theme.value = e.matches ? 'dark' : 'light'
      }
    })
  }
}

export function useTheme() {
  return { theme, toggleTheme }
}
