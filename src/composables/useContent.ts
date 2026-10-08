import { ref } from 'vue'
import type { PortfolioContent } from '../data/defaultContent'
import { DEFAULT_CONTENT } from '../data/defaultContent'

const DRAFT_KEY = 'porto-airin-draft'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function isValidContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== 'object') return false
  const c = value as Partial<PortfolioContent>
  return Boolean(c.hero && Array.isArray(c.skills) && Array.isArray(c.achievements) && Array.isArray(c.projects))
}

const content = ref<PortfolioContent>(clone(DEFAULT_CONTENT))

async function fetchRemoteContent(): Promise<PortfolioContent | null> {
  try {
    const res = await fetch('content.json', { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return isValidContent(data) ? (clone(data) as PortfolioContent) : null
  } catch {
    return null
  }
}

export function loadDraft(): PortfolioContent | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return isValidContent(data) ? (clone(data) as PortfolioContent) : null
  } catch {
    return null
  }
}

export async function initContent(): Promise<void> {
  const draft = loadDraft()
  if (draft) {
    content.value = draft
    return
  }
  const remote = await fetchRemoteContent()
  if (!remote) {
    content.value = clone(DEFAULT_CONTENT)
    return
  }
  content.value = {
    ...clone(DEFAULT_CONTENT),
    ...remote,
    hero: {
      ...clone(DEFAULT_CONTENT.hero),
      ...remote.hero,
      photo: remote.hero.photo || DEFAULT_CONTENT.hero.photo,
    },
  }
}

export function useContent() {
  return content
}

export function setContent(next: PortfolioContent): void {
  content.value = clone(next)
}

export function saveDraft(next?: PortfolioContent): void {
  const data = clone(next ?? content.value)
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  content.value = data
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY)
}

export function resetToDefaults(): void {
  clearDraft()
  content.value = clone(DEFAULT_CONTENT)
}

export function exportContentJson(next?: PortfolioContent): string {
  return JSON.stringify(next ?? content.value, null, 2)
}

export function downloadContentJson(next?: PortfolioContent): void {
  const json = exportContentJson(next)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'content.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function parseBold(text: string): Array<{ text: string; bold: boolean }> {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { text: part.slice(2, -2), bold: true }
    }
    return { text: part, bold: false }
  })
}

export function periodYear(period: string): number {
  const years = String(period ?? '').match(/\d{4}/g)
  if (!years?.length) return 0
  return Math.max(...years.map((y) => Number(y)))
}

export function periodStartYear(period: string): number {
  const years = String(period ?? '').match(/\d{4}/g)
  if (!years?.length) return 0
  return Math.min(...years.map((y) => Number(y)))
}

export function compareAchievements(
  a: { title: string; period: string },
  b: { title: string; period: string },
): number {
  const yearDiff = periodYear(b.period) - periodYear(a.period)
  if (yearDiff !== 0) return yearDiff
  const startDiff = periodStartYear(a.period) - periodStartYear(b.period)
  if (startDiff !== 0) return startDiff
  return a.title.localeCompare(b.title)
}

export function sortAchievements<T extends { title: string; period: string }>(list: T[]): T[] {
  return [...list].sort(compareAchievements)
}
