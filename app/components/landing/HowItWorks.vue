<script setup lang="ts">
import { Camera, Download, KeyRound } from '@lucide/vue'

const steps = [
  {
    icon: Download, title: 'Install and sign in',
    body: 'Run the installer and continue with Discord.',
    visual: ['HardWill-Setup.exe', 'Continue with Discord', 'Signed in'],
  },
  {
    icon: KeyRound, title: 'Add your Claude key',
    body: 'Paste it once in Settings. It stays on your PC.',
    visual: ['Settings', 'sk-ant-…1234', 'Key checked with Anthropic'],
  },
  {
    icon: Camera, title: 'Capture',
    body: 'Snapshot your character, then hover your gear.',
    visual: ['Character snapshot', 'Record items · DMG', 'Sopihe · 27 items saved'],
  },
]

const root = ref<HTMLElement | null>(null)

useGsap(root, ({ gsap, ScrollTrigger, reduced }) => {
  const el = root.value!
  const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('[data-step]'))
  const panels = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('[data-panel]'))
  const bar = el.querySelector('[data-step-bar]')

  if (reduced || !window.matchMedia('(min-width: 768px)').matches) {
    gsap.set(items, { opacity: 1 })
    return
  }

  gsap.set(panels.slice(1), { opacity: 0, y: 24 })
  gsap.set(items.slice(1), { opacity: 0.35 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el.querySelector('[data-pin]'),
      start: 'top top+=96',
      end: () => `+=${window.innerHeight * steps.length * 0.8}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  })
  tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: steps.length - 1 }, 0)
  for (let i = 1; i < steps.length; i++) {
    const at = i - 0.5
    tl.to(items[i - 1]!, { opacity: 0.35, duration: 0.3 }, at)
      .to(items[i]!, { opacity: 1, duration: 0.3 }, at)
      .to(panels[i - 1]!, { opacity: 0, y: -24, duration: 0.3 }, at)
      .to(panels[i]!, { opacity: 1, y: 0, duration: 0.3 }, at)
  }
  ScrollTrigger.refresh()
})
</script>

<template>
  <section id="how-it-works" ref="root" class="scroll-mt-20 border-y bg-card/40 py-24 md:py-32" aria-labelledby="how-title">
    <div class="mx-auto max-w-6xl px-5">
      <div data-pin class="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p class="font-mono text-xs tracking-widest text-muted-foreground uppercase">How it works</p>
          <h2 id="how-title" class="mt-3 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Up and running in three steps.
          </h2>

          <ol class="relative mt-10 space-y-7 pl-8">
            <span class="absolute top-1 bottom-1 left-[11px] w-px bg-border" aria-hidden="true" />
            <span data-step-bar class="absolute top-1 bottom-1 left-[11px] w-px origin-top bg-foreground max-md:hidden" aria-hidden="true" />
            <li v-for="(s, i) in steps" :key="s.title" data-step class="relative">
              <span class="absolute top-0 -left-8 flex size-[23px] items-center justify-center rounded-full border bg-background font-mono text-[11px]">
                {{ i + 1 }}
              </span>
              <h3 class="font-semibold">{{ s.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{{ s.body }}</p>
            </li>
          </ol>
        </div>

        <div class="relative aspect-[4/3.2] max-md:hidden" aria-hidden="true">
          <div
            v-for="(s, i) in steps" :key="s.title" data-panel
            class="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border bg-background"
          >
            <div class="flex items-center gap-2 border-b px-4 py-3">
              <component :is="s.icon" class="size-4" />
              <span class="text-xs font-medium">Step {{ i + 1 }}</span>
            </div>
            <div class="bg-grid relative flex flex-1 flex-col items-center justify-center gap-3 p-8">
              <div
                v-for="(line, j) in s.visual" :key="line"
                class="w-full max-w-xs rounded-xl border bg-card px-4 py-3 font-mono text-xs shadow-sm"
                :class="j === s.visual.length - 1 ? 'border-foreground/40 text-foreground' : 'text-muted-foreground'"
              >
                {{ line }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
