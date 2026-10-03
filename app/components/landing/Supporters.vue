<script setup lang="ts">
import { ArrowRight, Heart } from '@lucide/vue'

const { data } = await useSupporters()
const s = computed(() => data.value!)

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section v-if="s.total" ref="root" class="px-5 pb-24" aria-labelledby="supporters-title">
    <div class="mx-auto max-w-3xl text-center">
      <h2 id="supporters-title" data-reveal class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Heart class="size-4 fill-current text-foreground" aria-hidden="true" />
        Kept free by {{ s.total }} {{ s.total === 1 ? 'supporter' : 'supporters' }} on Patreon
      </h2>
      <ul v-if="s.credited.length" data-reveal class="mt-5 flex flex-wrap justify-center gap-2">
        <li v-for="p in s.credited.slice(0, 12)" :key="p.name + p.since" class="rounded-full border px-3 py-1 text-sm font-medium">
          {{ p.name }}
        </li>
      </ul>
      <NuxtLink data-reveal to="/supporters" class="mt-5 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4">
        See everyone <ArrowRight class="size-3.5" />
      </NuxtLink>
    </div>
  </section>
</template>
