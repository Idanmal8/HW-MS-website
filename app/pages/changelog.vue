<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const { data: entries } = await useAsyncData('changelog', () => $fetch('/api/changelog'))

useSeoMeta({
  title: 'Changelog',
  description: 'What changed in each version of Hard Will, the MapleStory progression tracker for Windows.',
})
useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: 'Changelog', item: '/changelog' }] })])

// Notes are plain text: lines starting with "- " are list items.
function blocks(notes: string) {
  const out: ({ kind: 'p', text: string } | { kind: 'ul', items: string[] })[] = []
  for (const raw of notes.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('- ')) {
      const last = out.at(-1)
      if (last?.kind === 'ul') last.items.push(line.slice(2))
      else out.push({ kind: 'ul', items: [line.slice(2)] })
    }
    else {
      out.push({ kind: 'p', text: line })
    }
  }
  return out
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-5 py-16 md:py-24">
    <header>
      <h1 class="text-4xl font-semibold tracking-tighter md:text-5xl">Changelog</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        What changed in each version. Hard Will updates itself, and shows what is new after each update.
      </p>
    </header>
    <Separator class="my-10" />
    <p v-if="!entries?.length" class="text-muted-foreground">
      The changelog is not available right now. See the <NuxtLink to="/download" class="text-foreground underline underline-offset-4">download page</NuxtLink> for the latest version.
    </p>
    <ol v-else class="space-y-12">
      <li v-for="(e, i) in entries" :id="`v${e.version}`" :key="e.version">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-semibold">v{{ e.version }}</h2>
          <Badge v-if="i === 0" variant="outline" class="font-mono">latest</Badge>
          <time :datetime="e.date" class="font-mono text-xs text-muted-foreground">{{ e.date }}</time>
        </div>
        <div class="prose-hw mt-3">
          <template v-for="(b, j) in blocks(e.notes)" :key="j">
            <ul v-if="b.kind === 'ul'">
              <li v-for="item in b.items" :key="item">{{ item }}</li>
            </ul>
            <p v-else>{{ b.text }}</p>
          </template>
        </div>
      </li>
    </ol>
  </div>
</template>
