export interface Supporters {
  credited: { name: string, tier: string, since: string | null }[]
  total: number
  tiers: { tier: string, count: number }[]
  updatedAt: string | null
}

const empty: Supporters = { credited: [], total: 0, tiers: [], updatedAt: null }

// Read from the Hard Will API at build time and baked into the pages, so the
// site never depends on the API being up. The API's Patreon webhook triggers
// a rebuild when supporters change.
export default defineEventHandler(async (): Promise<Supporters> => {
  const { apiUrl } = useRuntimeConfig()
  if (!apiUrl) return empty
  try {
    return await $fetch<Supporters>(`${apiUrl.replace(/\/$/, '')}/supporters`, { timeout: 15_000 })
  }
  catch (e) {
    console.warn(`[supporters] API unreachable, building without the list: ${(e as Error).message}`)
    return empty
  }
})
