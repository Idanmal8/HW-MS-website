import fallback from '../../app/data/release.json'

export type Platform = 'windows' | 'macos'

export interface ReleaseAsset {
  available: boolean
  url: string
  fileName: string
  sizeBytes: number
  sha256: string
}

export interface Release {
  version: string
  channel: string
  date: string
  notesUrl: string
  assets: Record<Platform, ReleaseAsset>
}

interface ApiRelease {
  version: string
  url: string
  sha256: string
  notes: string | null
  publishedAt: string
}

// The newest build per platform, read from the Hard Will API at build time
// and baked into the pages (like /supporters). Publishing a release
// redeploys the site, so the Download button always points at the newest
// installer. Falls back to app/data/release.json if the API is down.
export default defineEventHandler(async (): Promise<Release> => {
  const { apiUrl } = useRuntimeConfig()
  const base = (apiUrl || '').replace(/\/$/, '')
  const release: Release = structuredClone(fallback as Release)
  if (!base) return release

  const platforms: Platform[] = ['windows', 'macos']
  const latest = await Promise.all(platforms.map(p =>
    $fetch<ApiRelease>(`${base}/releases/latest`, { query: { platform: p }, timeout: 15_000 })
      .catch(() => null)))

  let newest: ApiRelease | null = null
  for (const [i, r] of latest.entries()) {
    if (!r) continue
    const p = platforms[i]!
    release.assets[p] = {
      available: true,
      url: r.url,
      fileName: r.url.split('/').pop() ?? release.assets[p].fileName,
      sizeBytes: await sizeOf(r.url),
      sha256: r.sha256,
    }
    if (!newest || r.publishedAt > newest.publishedAt) newest = r
  }
  if (newest) {
    release.version = newest.version
    release.date = newest.publishedAt.slice(0, 10)
  }
  else {
    console.warn('[release] API has no release (or is unreachable), using app/data/release.json')
  }
  return release
})

/** The installer's size from a HEAD request (0 if unknown). */
async function sizeOf(url: string): Promise<number> {
  try {
    const res = await $fetch.raw(url, { method: 'HEAD', timeout: 15_000 })
    return Number(res.headers.get('content-length') ?? 0)
  }
  catch {
    return 0
  }
}
