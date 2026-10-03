<script setup lang="ts">
import { AppWindow, Check, CheckCheck, ChevronDown, ChevronLeft, ChevronRight, CircleDot, Minus } from '@lucide/vue'
import { characters } from '~/data/characters'

// HTML copy of the in-game HUD: the capsule and its Dailies panel.
const me = characters[1]
const dailies = [
  { name: 'Cernium', group: 'Sacred Symbol Dailies' },
  { name: 'Hotel Arcus', group: 'Sacred Symbol Dailies' },
  { name: 'Odium', group: 'Sacred Symbol Dailies' },
  { name: 'Shangri-La', group: 'Sacred Symbol Dailies' },
  { name: 'Monster Park', group: 'Other Dailies' },
]
</script>

<template>
  <div class="dark flex w-full max-w-[420px] flex-col gap-3 text-left text-zinc-50">
    <!-- capsule -->
    <div class="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#09090b] py-2 pr-3 pl-3 shadow-xl shadow-black/40">
      <img decoding="async" src="/logo.webp" alt="" class="size-5 [image-rendering:pixelated]">
      <img decoding="async" :src="me.avatar" :alt="me.name" class="size-8 rounded-full bg-zinc-800 object-cover object-top [image-rendering:pixelated]">
      <div class="min-w-0 flex-1 leading-tight">
        <p class="text-[13px] font-semibold">{{ me.name }}</p>
        <p class="text-[10.5px] text-zinc-400">Lv {{ me.level }} · 54.5% · 36m</p>
      </div>
      <span class="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-3 py-1.5 text-[12px] font-medium text-zinc-900"><CircleDot class="size-3.5" /> Capture</span>
      <Minus class="size-4 text-zinc-300" /><ChevronDown class="size-4 text-zinc-300" />
    </div>

    <!-- panel -->
    <div class="rounded-3xl border border-white/10 bg-[#09090b] p-4 shadow-2xl shadow-black/50">
      <div class="flex gap-1.5 overflow-hidden">
        <span
          v-for="(c, i) in characters" :key="c.name"
          class="flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[11px]"
          :class="i === 1 ? 'border-white/40 bg-white/10' : 'border-white/10'"
        >
          <img decoding="async" :src="c.avatar" alt="" class="size-5 rounded-full object-cover object-top [image-rendering:pixelated]"> {{ c.name }}
        </span>
      </div>

      <div class="mt-3 flex items-center gap-1 text-[11.5px]">
        <ChevronLeft class="size-4 text-zinc-400" />
        <div class="grid flex-1 grid-cols-3 rounded-lg bg-white/5 p-0.5 text-center">
          <span class="py-1 text-zinc-400">Capture</span>
          <span class="py-1 text-zinc-400">Bosses</span>
          <span class="rounded-md bg-[#09090b] py-1 font-semibold">Dailies</span>
        </div>
        <ChevronRight class="size-4 text-zinc-400" />
      </div>

      <div class="mt-3 flex items-end justify-between">
        <div>
          <p class="text-[13px] font-semibold">Today · <span data-daily-count>4</span>/5</p>
          <p class="text-[10.5px] text-zinc-400">Resets in 8h 15m</p>
        </div>
        <div class="flex items-center gap-3 text-[11.5px] font-medium">
          <span>Clear</span>
          <span class="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-2.5 py-1.5 text-zinc-900"><CheckCheck class="size-3.5" /> Select all</span>
        </div>
      </div>

      <ul class="mt-3 space-y-2.5">
        <li v-for="(d, i) in dailies" :key="d.name" data-daily class="flex items-center gap-2.5 text-[12.5px]" :data-done="i < 4">
          <span data-daily-box class="flex size-4 items-center justify-center rounded border" :class="i < 4 ? 'border-green-500 bg-green-500' : 'border-zinc-500'">
            <Check v-if="i < 4" class="size-3 text-zinc-950" :stroke-width="3" />
          </span>
          <span data-daily-name :class="i < 4 ? 'text-zinc-500 line-through' : ''">{{ d.name }}</span>
          <span class="ml-auto text-[10.5px] text-zinc-500">{{ d.group }}</span>
        </li>
      </ul>

      <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10.5px] text-zinc-400">
        <span>API today $0.04 · 6 calls</span>
        <span class="flex items-center gap-1.5 text-[12px] font-medium text-zinc-50"><AppWindow class="size-3.5" /> Open app</span>
      </div>
    </div>
  </div>
</template>
