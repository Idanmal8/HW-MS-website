<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { patreonUrl } from '~/data/site'

const root = ref<HTMLElement | null>(null)

useGsap(root, ({ gsap, reduced }) => {
  if (reduced) return
  gsap.fromTo(root.value!.querySelector('[data-cta-card]'),
    { clipPath: 'inset(12% 8% 12% 8% round 32px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top 85%', end: 'top 35%', scrub: true },
    })
})
</script>

<template>
  <section ref="root" class="px-5 pb-24 md:pb-32" aria-labelledby="cta-title">
    <div data-cta-card class="will-change-[clip-path] theme-invert relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-background px-6 py-20 text-center text-foreground">
      <div class="bg-grid mask-radial absolute inset-0" aria-hidden="true" />
      <div class="relative">
        <h2 id="cta-title" class="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Your next upgrade is one hover away.
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-muted-foreground">
          Download Hard Will and take your first character snapshot in under two minutes.
        </p>
        <div class="mt-9">
          <SiteDownloadButtons />
        </div>
        <p class="mt-8 text-sm text-muted-foreground">
          Free while in early access. Enjoying it?
          <a :href="patreonUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4">
            <Heart class="size-3.5 fill-current" aria-hidden="true" />Support on Patreon
          </a>
        </p>
      </div>
    </div>
  </section>
</template>
