<script setup lang="ts">
import { ArrowUpRight, Clock } from '@lucide/vue'

const { data: guides } = await useAsyncData('guides', () =>
  queryCollection('guides').select('path', 'title', 'description', 'order', 'readingMinutes').order('order', 'ASC').all())

useSeoMeta({
  title: 'Guides',
  description: 'Step-by-step guides for Hard Will: install it, record your MapleStory gear, read your dashboard and use the star force calculator.',
})
defineOgImage('Hardwill', { title: 'Guides', description: 'Install Hard Will, record your gear and plan your next upgrade.' })
useSchemaOrg([
  defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: 'Guides', item: '/guides' }] }),
  defineWebPage({ '@type': 'CollectionPage' }),
])

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <div ref="root" class="mx-auto max-w-6xl px-5 py-20 md:py-28">
    <header class="max-w-2xl">
      <p data-reveal class="font-mono text-xs tracking-widest text-muted-foreground uppercase">Guides</p>
      <h1 data-reveal class="mt-3 text-5xl font-semibold tracking-tighter md:text-6xl">Learn Hard Will</h1>
      <p data-reveal class="mt-4 text-muted-foreground">
        Short, practical guides, from your first snapshot to planning a 22★ run.
      </p>
    </header>

    <ol class="mt-14 grid gap-4 md:grid-cols-2">
      <li v-for="(g, i) in guides" :key="g.path" data-reveal>
        <NuxtLink
          :to="g.path"
          class="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-foreground/30"
        >
          <div class="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>{{ String(i + 1).padStart(2, '0') }}</span>
            <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h2 class="mt-8 text-xl font-semibold tracking-tight">{{ g.title }}</h2>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{{ g.description }}</p>
          <p v-if="g.readingMinutes" class="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock class="size-3.5" /> {{ g.readingMinutes }} min read
          </p>
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>
