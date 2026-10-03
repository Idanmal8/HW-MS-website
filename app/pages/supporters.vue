<script setup lang="ts">
import { Crown, Heart } from '@lucide/vue'

const { data } = await useSupporters()
const s = computed(() => data.value!)

useSeoMeta({
  title: 'Supporters',
  description: 'The people who keep Hard Will free, supporting it on Patreon.',
})
defineOgImage('Hardwill', { title: 'Our supporters', description: 'The people keeping Hard Will free.' })
useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: 'Supporters', item: '/supporters' }] })])

const since = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null

const root = ref<HTMLElement | null>(null)
useReveal(root)
useGsap(root, ({ gsap, reduced }) => {
  if (reduced) return
  gsap.from(root.value!.querySelectorAll('[data-legend]'), {
    opacity: 0, y: 16, scale: 0.96, stagger: 0.05, duration: 0.6, delay: 0.2,
  })
})
</script>

<template>
  <div ref="root" class="mx-auto max-w-4xl px-5 py-20 md:py-28">
    <header class="text-center">
      <p data-reveal class="font-mono text-xs tracking-widest text-muted-foreground uppercase">Supporters</p>
      <h1 data-reveal class="mt-3 text-5xl font-semibold tracking-tighter text-balance md:text-6xl">
        The people keeping Hard Will free.
      </h1>
      <p data-reveal class="mx-auto mt-4 max-w-xl text-muted-foreground">
        Hard Will is built in spare time and stays free thanks to these players. Thank you.
      </p>
      <div data-reveal class="mt-8">
        <SiteSupportButton size="lg" label="Support on Patreon" class="h-11 px-6" />
      </div>
    </header>

    <dl v-if="s.total" data-reveal class="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="rounded-2xl border bg-card p-5">
        <dt class="text-xs text-muted-foreground">Supporters</dt>
        <dd class="mt-1 text-3xl font-semibold tabular-nums">{{ s.total }}</dd>
      </div>
      <div v-for="t in s.tiers" :key="t.tier" class="rounded-2xl border p-5">
        <dt class="text-xs text-muted-foreground">{{ t.tier }}</dt>
        <dd class="mt-1 text-3xl font-semibold tabular-nums">{{ t.count }}</dd>
      </div>
    </dl>

    <section class="mt-16" aria-labelledby="legends">
      <h2 id="legends" data-reveal class="flex items-center gap-2 text-xl font-semibold">
        <Crown class="size-5" aria-hidden="true" /> Legends
      </h2>
      <ul v-if="s.credited.length" class="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <li v-for="p in s.credited" :key="p.name + p.since" data-legend class="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            {{ p.name.slice(0, 1).toUpperCase() }}
          </span>
          <span class="min-w-0">
            <span class="block truncate font-medium">{{ p.name }}</span>
            <span v-if="since(p.since)" class="block text-xs text-muted-foreground">Since {{ since(p.since) }}</span>
          </span>
        </li>
      </ul>
      <div v-else data-reveal class="mt-6 rounded-2xl border border-dashed p-10 text-center">
        <Heart class="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
        <p class="mt-3 font-medium">No Legends yet.</p>
        <p class="mt-1 text-sm text-muted-foreground">Join the Legend tier and your name goes right here.</p>
      </div>
    </section>
  </div>
</template>
