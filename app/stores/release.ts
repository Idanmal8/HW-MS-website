import release from '~/data/release.json'

export type Platform = 'windows' | 'macos'

export interface ReleaseAsset {
  available: boolean
  url: string
  fileName: string
  sizeBytes: number
  sha256: string
}

export const platformLabel: Record<Platform, string> = {
  windows: 'Windows',
  macos: 'macOS',
}

// Starts from release.json; load() replaces it with the newest builds from
// the Hard Will API (/api/release, at build time), so the version and
// download links are baked into the pre-rendered HTML on every deploy.
export const useReleaseStore = defineStore('release', () => {
  const version = ref(release.version)
  const channel = ref(release.channel)
  const date = ref(release.date)
  const notesUrl = ref(release.notesUrl)
  const assets = ref<Record<Platform, ReleaseAsset>>(release.assets)

  // Guessed on the client only; the server render shows both platforms.
  const detected = ref<Platform | null>(null)

  function detectPlatform() {
    if (import.meta.server) return
    const ua = navigator.userAgent
    if (/Mac|iPhone|iPad/i.test(ua)) detected.value = 'macos'
    else if (/Win/i.test(ua)) detected.value = 'windows'
  }

  // The visitor's platform when we have a build for it, otherwise the first build we have.
  const primary = computed<Platform>(() => {
    if (detected.value && assets.value[detected.value].available) return detected.value
    return (Object.keys(assets.value) as Platform[]).find(p => assets.value[p].available) ?? 'windows'
  })
  const detectedUnavailable = computed(() => !!detected.value && !assets.value[detected.value].available)

  async function load() {
    const r = await $fetch('/api/release')
    version.value = r.version
    channel.value = r.channel
    date.value = r.date
    notesUrl.value = r.notesUrl
    assets.value = r.assets
  }

  function sizeLabel(p: Platform) {
    const b = assets.value[p].sizeBytes
    return b ? `${(b / 1024 / 1024).toFixed(1)} MB` : ''
  }

  return { version, channel, date, notesUrl, assets, detected, primary, detectedUnavailable, detectPlatform, sizeLabel, load }
})
