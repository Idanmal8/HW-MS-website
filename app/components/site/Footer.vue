<script setup lang="ts">
const release = useReleaseStore()
const year = new Date().getFullYear()

const columns = [
  { title: 'Product', links: [
    { label: 'Features', to: '/#features' },
    { label: 'Download', to: '/download' },
    { label: 'Changelog', to: '/changelog' },
    { label: 'FAQ', to: '/#faq' },
    { label: 'Supporters', to: '/supporters' },
  ] },
  { title: 'Learn', links: [
    { label: 'All guides', to: '/guides' },
    { label: 'Getting started', to: '/guides/getting-started' },
    { label: 'Recording your gear', to: '/guides/recording-items' },
  ] },
  { title: 'Legal', links: [
    { label: 'Privacy policy', to: '/privacy' },
    { label: 'Terms of service', to: '/terms' },
  ] },
]
</script>

<template>
  <footer class="border-t">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div class="space-y-4">
        <SiteLogo with-text />
        <p class="max-w-xs text-sm text-muted-foreground">
          Your MapleStory progression, read straight from the game window and kept in one place.
        </p>
        <p class="font-mono text-xs text-muted-foreground">v{{ release.version }} · {{ release.channel }}</p>
        <SiteSupportButton label="Support on Patreon" />
      </div>
      <nav v-for="col in columns" :key="col.title" :aria-label="col.title">
        <h2 class="mb-3 text-sm font-medium">{{ col.title }}</h2>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li v-for="l in col.links" :key="l.to">
            <NuxtLink :to="l.to" class="hover:text-foreground">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="border-t">
      <p class="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-muted-foreground">
        © {{ year }} Hard Will. An independent fan-made tool, not affiliated with or endorsed by Nexon.
        MapleStory is a trademark of Nexon.
      </p>
    </div>
  </footer>
</template>
