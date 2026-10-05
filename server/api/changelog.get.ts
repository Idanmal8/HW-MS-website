export interface ChangelogEntry {
  version: string
  date: string
  notes: string
}

// Every published version with its notes, newest first, read from the Hard
// Will API at build time (publishing a release rebuilds the site). Empty if
// the API is unreachable, so the site still builds.
export default defineEventHandler(async (): Promise<ChangelogEntry[]> => {
  const { apiUrl } = useRuntimeConfig()
  if (!apiUrl) return []
  try {
    const all = await $fetch<{ version: string, notes: string | null, publishedAt: string }[]>(
      `${apiUrl.replace(/\/$/, '')}/releases`, { query: { platform: 'windows' }, timeout: 15_000 })
    return all.map(r => ({ version: r.version, date: r.publishedAt.slice(0, 10), notes: r.notes ?? '' }))
  }
  catch (e) {
    console.warn(`[changelog] API unreachable, building without it: ${(e as Error).message}`)
    return []
  }
})
