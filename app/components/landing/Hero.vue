<script setup lang="ts">
import { ArrowRight, Download } from '@lucide/vue'
import { SplitText } from 'gsap/SplitText'
import { Button } from '@/components/ui/button'
import { platformLabel } from '~/stores/release'

const release = useReleaseStore()
onMounted(() => release.detectPlatform())

const root = ref<HTMLElement | null>(null)

useGsap(root, ({ gsap, reduced }) => {
  if (reduced) return
  const split = SplitText.create(root.value!.querySelector('[data-hero-title]'), { type: 'words', mask: 'words' })
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  tl.from('[data-hero-badge]', { opacity: 0, y: 12, duration: 0.6 })
    .from(split.words, { yPercent: 110, opacity: 0, duration: 1, stagger: 0.07 }, '-=0.3')
    .fromTo('[data-hero-sub]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .fromTo('[data-hero-cta] > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, '-=0.5')
    .fromTo('[data-hero-mock]', { opacity: 0, y: 60, rotateX: 18, scale: 0.94 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.4 }, '-=0.6')
    .from('[data-card]', { opacity: 0, y: 14, stagger: 0.06, duration: 0.5 }, '-=0.9')
    .from('[data-progress]', { scaleX: 0, duration: 1.2, ease: 'power2.inOut' }, '<')

  // Count the dashboard numbers up from zero.
  gsap.utils.toArray<HTMLElement>(root.value!.querySelectorAll('[data-count]')).forEach((el) => {
    const to = Number(el.dataset.to)
    const decimals = Number(el.dataset.decimals)
    const obj = { v: 0 }
    tl.to(obj, {
      v: to, duration: 1.4, ease: 'power2.out',
      onUpdate: () => { el.textContent = obj.v.toFixed(decimals) },
    }, 1.1)
  })

  // Drift the mock up slightly and fade the glow as the hero scrolls away.
  gsap.to('[data-hero-mock]', {
    yPercent: -8, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
  })
  gsap.to('[data-hero-glow]', {
    opacity: 0, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
  })
})
</script>

<template>
  <section ref="root" class="relative isolate overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32" aria-labelledby="hero-title">
    <div class="bg-grid mask-radial absolute inset-0 -z-10" aria-hidden="true" />
    <div data-hero-glow class="pointer-events-none absolute top-[-10%] left-1/2 -z-10 h-[620px] w-[1000px] -translate-x-1/2 will-change-[opacity] [background:radial-gradient(closest-side,var(--glow),transparent)]" aria-hidden="true" />

    <div class="mx-auto max-w-6xl px-5 text-center">
      <NuxtLink
        data-hero-badge to="/guides/getting-started"
        class="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <span class="rounded-full bg-foreground px-1.5 py-px font-mono text-[10px] text-background">v{{ release.version }}</span>
        Early access · Built for GMS v.271
        <ArrowRight class="size-3" />
      </NuxtLink>

      <h1
        id="hero-title" data-hero-title
        class="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl"
      >
        Every star, flame and level. Tracked for you.
      </h1>

      <p data-hero-sub class="mx-auto mt-6 max-w-2xl text-base text-pretty text-muted-foreground md:text-lg">
        A desktop companion for MapleStory. Your gear, bosses and dailies, read straight from the game.
      </p>

      <div data-hero-cta class="mt-9 flex flex-wrap items-center justify-center gap-3">
        <!-- GSAP animates the wrappers: the buttons' own CSS transitions would fight it. -->
        <div>
          <Button as-child size="lg" class="h-11 px-6">
            <NuxtLink to="/download">
              <Download /> {{ release.detectedUnavailable ? 'Download' : `Download for ${platformLabel[release.primary]}` }}
            </NuxtLink>
          </Button>
        </div>
        <div>
          <Button as-child size="lg" variant="outline" class="h-11 px-6">
            <NuxtLink to="/guides">Read the guides <ArrowRight /></NuxtLink>
          </Button>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-16 max-w-5xl px-5 [perspective:1600px] md:mt-20">
      <div data-hero-mock class="will-change-transform">
        <LandingAppMock />
      </div>
    </div>
  </section>
</template>
