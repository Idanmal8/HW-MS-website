<script setup lang="ts">
import { Camera, Gamepad2, Hexagon, History, LayoutGrid, Layers, ListChecks, Pencil, RefreshCw, Shield, Sparkles, Star, Swords, Trophy, TrendingUp, Wrench, Flame, Coins, Lightbulb, Disc, Minus, Square, X } from '@lucide/vue'
import { characters } from '~/data/characters'

// A faithful HTML copy of the desktop app's Overview tab (always dark, like the app).
// Card numbers count up from the hero timeline via data-count.
const me = characters[0]
const cards = [
  { label: 'Level', icon: TrendingUp, value: me.level, decimals: 0, suffix: '', sub: `${me.exp}% · next in 61 days` },
  { label: 'Items tracked', icon: Shield, value: 27, decimals: 0, suffix: '', sub: '9 legendary potential' },
  { label: 'Star force', icon: Star, value: 19, decimals: 0, suffix: ' ★', sub: 'average over 27 items' },
  { label: 'Flame score', icon: Flame, value: 118, decimals: 0, suffix: '', sub: 'INT equivalent, 27 items' },
  { label: 'Potential INT %', icon: Sparkles, value: 312, decimals: 0, suffix: '%', sub: 'summed over all items' },
  { label: 'Meso', icon: Coins, value: 4.2, decimals: 1, suffix: 'B', sub: 'from your last snapshot' },
]
const trackers = [
  { icon: Swords, label: 'Boss Tracker' },
  { icon: ListChecks, label: 'Daily Tracker' },
  { icon: Hexagon, label: 'HEXA & Liberation' },
]
const tabs = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: Shield, label: 'Equipment' },
  { icon: History, label: 'History' },
  { icon: Wrench, label: 'Tools' },
]
</script>

<template>
  <div class="dark overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] text-left text-zinc-50 shadow-2xl shadow-black/40 dark:shadow-black/70">
    <!-- window title bar -->
    <div class="flex h-7 items-center justify-between border-b border-white/5 bg-[#0c1426] px-3 text-[10px] text-zinc-400">
      <span>Hard Will</span>
      <span class="flex gap-3" aria-hidden="true"><Minus class="size-3" /><Square class="size-2.5" /><X class="size-3" /></span>
    </div>

    <div class="grid grid-cols-[176px_1fr] max-md:grid-cols-1">
      <!-- sidebar -->
      <aside class="flex flex-col border-r border-white/10 p-2.5 max-md:hidden">
        <div class="flex items-center gap-2 px-1.5 py-1">
          <img decoding="async" src="/logo.webp" alt="" class="size-6 [image-rendering:pixelated]">
          <div class="leading-tight">
            <p class="text-[11px] font-semibold">Hard Will</p>
            <p class="text-[9px] text-zinc-400">GMS progression</p>
          </div>
        </div>

        <p class="mt-3 px-1.5 text-[9px] text-zinc-400">Characters</p>
        <ul class="mt-1 space-y-0.5">
          <li
            v-for="(c, i) in characters" :key="c.name"
            class="flex items-center gap-2 rounded-lg px-1.5 py-1.5" :class="i === 0 ? 'bg-white/10' : ''"
          >
            <img decoding="async" :src="c.avatar" :alt="c.name" class="size-7 rounded-full bg-zinc-800 object-cover object-top [image-rendering:pixelated]">
            <div class="min-w-0 leading-tight">
              <p class="truncate text-[11px] font-semibold">{{ c.name }}</p>
              <p class="truncate text-[9px] text-zinc-400">Lv. {{ c.level }} · {{ c.job }} · {{ c.items }} items</p>
            </div>
          </li>
        </ul>

        <p class="mt-3 px-1.5 text-[9px] text-zinc-400">Trackers</p>
        <ul class="mt-1 space-y-0.5 text-[10.5px] text-zinc-300">
          <li v-for="t in trackers" :key="t.label" class="flex items-center gap-2 px-1.5 py-1">
            <component :is="t.icon" class="size-3" /> {{ t.label }}
          </li>
        </ul>

        <p class="mt-3 px-1.5 text-[9px] text-zinc-400">Capture</p>
        <div class="mt-1 space-y-1.5 text-[10px] font-medium">
          <div class="flex items-center justify-center gap-1.5 rounded-md bg-zinc-50 py-1.5 text-zinc-900"><Disc class="size-3" /> Record items · DMG</div>
          <div class="flex items-center justify-center gap-1.5 rounded-md bg-zinc-800 py-1.5"><Gamepad2 class="size-3" /> Game HUD</div>
          <div class="flex items-center justify-center gap-1.5 rounded-md border border-white/10 py-1.5"><Camera class="size-3" /> Character snapshot</div>
        </div>

        <div class="mt-auto flex items-center gap-1.5 border-t border-white/10 px-1.5 pt-2.5 text-[9px] text-zinc-400">
          <span class="size-1.5 rounded-full bg-green-500" /> Solis · online
        </div>
      </aside>

      <!-- main -->
      <div class="min-w-0 p-4">
        <div class="flex items-start gap-3">
          <img decoding="async" :src="me.avatar" :alt="me.name" class="size-12 shrink-0 rounded-full border border-white/10 bg-zinc-800 object-cover object-top [image-rendering:pixelated]">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="mr-1 text-lg font-bold tracking-tight">{{ me.name }}</span>
              <span class="rounded-md border border-white/10 px-1.5 py-0.5 text-[9px] font-semibold">Lv. {{ me.level }}</span>
              <span class="flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[9px] font-semibold"><Pencil class="size-2.5" /> {{ me.job }}</span>
              <span class="flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[9px] font-semibold"><Trophy class="size-2.5" /> Solis #{{ me.rank.toLocaleString('en-US') }}</span>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <div class="h-1 w-40 overflow-hidden rounded-full bg-white/10 max-sm:w-24">
                <div data-progress class="h-full w-[12%] origin-left rounded-full bg-zinc-50" />
              </div>
              <span class="text-[10px] font-semibold">{{ me.exp }}% EXP</span>
              <span class="text-[9px] text-zinc-500 max-sm:hidden">as of Oct 3, 18:07 · Nexon</span>
            </div>
          </div>
          <span class="rounded-md border border-white/10 p-1.5 max-sm:hidden"><RefreshCw class="size-3" /></span>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-1.5 text-[10px]">
          <div class="flex rounded-lg bg-white/5 p-0.5">
            <span
              v-for="t in tabs" :key="t.label"
              class="flex items-center gap-1 rounded-md px-2 py-1" :class="t.active ? 'bg-[#09090b] font-medium' : 'text-zinc-400'"
            ><component :is="t.icon" class="size-3" />{{ t.label }}</span>
          </div>
          <div class="flex rounded-lg bg-white/5 p-0.5 max-lg:hidden">
            <span class="flex items-center gap-1 px-2 py-1 text-zinc-400"><Layers class="size-3" />Preset</span>
            <span class="rounded-md bg-[#09090b] px-2 py-1 font-medium">1 · DMG (27)</span>
            <span class="px-2 py-1 text-zinc-400">2 · Drop (21)</span>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-2 max-sm:grid-cols-2">
          <div v-for="c in cards" :key="c.label" data-card class="rounded-xl border border-white/10 p-2.5">
            <div class="flex items-center justify-between text-[9.5px] font-medium text-zinc-300">
              {{ c.label }} <component :is="c.icon" class="size-3 text-zinc-400" />
            </div>
            <p class="mt-1 text-lg font-bold tabular-nums">
              <span data-count :data-to="c.value" :data-decimals="c.decimals">{{ c.value.toFixed(c.decimals) }}</span>{{ c.suffix }}
            </p>
            <p class="truncate text-[9px] text-zinc-400">{{ c.sub }}</p>
          </div>
        </div>

        <div class="mt-2 grid grid-cols-[1fr_2fr] gap-2 max-sm:grid-cols-1">
          <div data-card class="rounded-xl border border-white/10 p-2.5">
            <div class="flex items-center justify-between text-[9.5px] font-medium text-zinc-300">Next HEXA upgrade <Hexagon class="size-3 text-zinc-400" /></div>
            <p class="mt-1 text-base font-bold">Mastery 1 → 5</p>
            <p class="text-[9px] text-zinc-400">126 fragments · in 1.4 days</p>
          </div>
          <div data-card class="rounded-xl border border-white/10 p-2.5">
            <p class="flex items-center gap-1.5 text-[11px] font-semibold"><Lightbulb class="size-3" /> Upgrade ideas</p>
            <p class="mt-1 text-[9.5px] leading-relaxed text-zinc-400">
              Your earrings sit at ★17 while the rest of your set is ★18+. Cheapest next step: earrings ★17 → ★18.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
