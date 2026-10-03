<script setup lang="ts">
import { Check, ShieldCheck } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformLabel, type Platform } from '~/stores/release'

const release = useReleaseStore()

useSeoMeta({
  title: 'Download',
  description: `Download Hard Will ${release.version} for Windows. A desktop MapleStory progression tracker for star force, flames, potentials and leveling.`,
})
defineOgImage('Hardwill', { title: 'Download Hard Will', description: `v${release.version} for Windows. macOS coming soon.` })
useSoftwareSchema()
useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: 'Download', item: '/download' }] })])

const requirements: Record<Platform, string[]> = {
  windows: ['Windows 10 or 11, 64-bit', 'A Discord account to sign in', 'Your own Anthropic API key for Claude'],
  macos: ['macOS build in development', 'Follow the changelog for availability'],
}

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <div ref="root" class="mx-auto max-w-4xl px-5 py-20 md:py-28">
    <header class="text-center">
      <Badge data-reveal variant="outline" class="font-mono">v{{ release.version }} · {{ release.channel }}</Badge>
      <h1 data-reveal class="mt-5 text-5xl font-semibold tracking-tighter md:text-6xl">Download Hard Will</h1>
      <p data-reveal class="mx-auto mt-4 max-w-xl text-muted-foreground">
        Install the desktop app, open MapleStory and take your first snapshot. New to it?
        Follow <NuxtLink to="/guides/getting-started" class="text-foreground underline underline-offset-4">Getting started</NuxtLink>.
      </p>
      <div data-reveal class="mt-10">
        <SiteDownloadButtons />
      </div>
    </header>

    <div class="mt-20 grid gap-4 md:grid-cols-2">
      <Card v-for="p in (['windows', 'macos'] as Platform[])" :key="p" data-reveal>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            {{ platformLabel[p] }}
            <Badge :variant="release.assets[p].available ? 'default' : 'secondary'">
              {{ release.assets[p].available ? 'Available' : 'Coming soon' }}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <ul class="space-y-2">
            <li v-for="r in requirements[p]" :key="r" class="flex gap-2 text-muted-foreground">
              <Check class="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden="true" /> {{ r }}
            </li>
          </ul>
          <div v-if="release.assets[p].sha256" class="rounded-lg border bg-muted/40 p-3">
            <p class="flex items-center gap-1.5 text-xs font-medium"><ShieldCheck class="size-3.5" /> SHA-256</p>
            <p class="mt-1 font-mono text-[11px] break-all text-muted-foreground">{{ release.assets[p].sha256 }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <section data-reveal class="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6" aria-labelledby="support">
      <div>
        <h2 id="support" class="font-semibold">Hard Will is free</h2>
        <p class="mt-1 text-sm text-muted-foreground">It is built in spare time. If it saves you time, consider supporting it.</p>
      </div>
      <SiteSupportButton size="default" label="Support on Patreon" />
    </section>

    <section data-reveal class="mt-4 rounded-2xl border p-6 text-sm text-muted-foreground" aria-labelledby="smartscreen">
      <h2 id="smartscreen" class="font-semibold text-foreground">Seeing “Windows protected your PC”?</h2>
      <p class="mt-2 leading-relaxed">
        Early-access builds are new to Microsoft SmartScreen, which warns about apps it has not seen often.
        Choose <strong class="text-foreground">More info → Run anyway</strong>. You can compare the file's SHA-256 above
        with the one on the <a :href="release.notesUrl" class="text-foreground underline underline-offset-4" rel="noopener">release page</a>.
      </p>
    </section>
  </div>
</template>
