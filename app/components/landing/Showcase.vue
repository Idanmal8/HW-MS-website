<script setup lang="ts">
import { Hexagon, Search, Trophy } from '@lucide/vue'

const extras = [
  { icon: Hexagon, title: 'HEXA & Liberation', body: 'Fragments, Sol Erda and Genesis passes, planned.' },
  { icon: Trophy, title: 'Nexon ranking sync', body: 'Level, EXP and world rank, fetched for you.' },
  { icon: Search, title: 'Guide search', body: 'Grandis Library and the wiki, one Ctrl K away.' },
]

const root = ref<HTMLElement | null>(null)
useReveal(root)

useGsap(root, ({ gsap, reduced }) => {
  if (reduced) return
  const el = root.value!

  gsap.fromTo(el.querySelector('[data-equip-shot]'),
    { scale: 0.88, rotate: -2, opacity: 0.3 },
    { scale: 1, rotate: 0, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: el.querySelector('[data-equip-row]'), start: 'top 85%', end: 'top 30%', scrub: true } })

  // Tick the dailies one by one when the HUD comes into view. The server
  // render shows them already done, so nothing is lost without JS.
  const done = [...el.querySelectorAll<HTMLElement>('[data-daily][data-done="true"]')]
  const count = el.querySelector<HTMLElement>('[data-daily-count]')!
  const setDone = (i: number, on: boolean) => {
    done[i]!.querySelector('[data-daily-name]')!.classList.toggle('text-zinc-500', on)
    done[i]!.querySelector('[data-daily-name]')!.classList.toggle('line-through', on)
  }
  done.forEach((_, i) => setDone(i, false))
  count.textContent = '0'

  const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('[data-hud-row]'), start: 'top 65%' } })
  tl.from(el.querySelector('[data-hud]'), { y: 40, opacity: 0, duration: 0.8 })
  done.forEach((row, i) => {
    tl.fromTo(row.querySelector('[data-daily-box]'), { scale: 0 }, {
      scale: 1, duration: 0.3, ease: 'back.out(3)',
      onStart: () => { setDone(i, true); count.textContent = String(i + 1) },
    }, i === 0 ? '+=0.1' : '+=0.15')
  })
})
</script>

<template>
  <section id="features" ref="root" class="scroll-mt-20 py-24 md:py-32" aria-labelledby="features-title">
    <div class="mx-auto max-w-6xl px-5">
      <h2 id="features-title" data-reveal class="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        Your whole account, read from the game.
      </h2>

      <!-- equipment -->
      <div data-equip-row class="mt-20 grid items-center gap-10 md:grid-cols-[1fr_1.25fr] md:gap-16">
        <div>
          <p data-reveal class="font-mono text-xs tracking-widest text-muted-foreground uppercase">Equipment</p>
          <h3 data-reveal class="mt-3 text-3xl font-semibold tracking-tight">Hover your gear. We read the rest.</h3>
          <p data-reveal class="mt-4 text-muted-foreground">
            Start recording and hover each item. Stars, flames and potentials land in your in-game layout.
          </p>
        </div>
        <img
          data-equip-shot src="/app/equipment-sopihe.webp" width="648" height="620" loading="lazy" decoding="async"
          alt="Hard Will equipment tab showing Sopihe's gear in the in-game layout, with star force on each item"
          class="w-full rounded-2xl border border-white/10 shadow-xl shadow-black/30 will-change-transform"
        >
      </div>

      <!-- HUD -->
      <div data-hud-row class="mt-28 grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
        <div data-hud class="relative flex justify-center rounded-3xl border bg-grid px-6 py-10 max-md:order-2">
          <LandingHudMock />
        </div>
        <div>
          <p data-reveal class="font-mono text-xs tracking-widest text-muted-foreground uppercase">Game HUD</p>
          <h3 data-reveal class="mt-3 text-3xl font-semibold tracking-tight">Bosses and dailies, on top of the game.</h3>
          <p data-reveal class="mt-4 text-muted-foreground">
            A small capsule over MapleStory: capture, tick off dailies and bosses without alt-tabbing.
          </p>
        </div>
      </div>

      <!-- extras -->
      <ul class="mt-28 grid gap-4 md:grid-cols-3">
        <li v-for="x in extras" :key="x.title" data-reveal class="rounded-2xl border bg-card p-6">
          <component :is="x.icon" class="size-5" aria-hidden="true" />
          <h3 class="mt-4 font-semibold">{{ x.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ x.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
