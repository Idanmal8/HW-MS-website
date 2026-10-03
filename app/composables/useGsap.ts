import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

type Setup = (ctx: { gsap: typeof gsap, ScrollTrigger: typeof ScrollTrigger, reduced: boolean }) => void

/**
 * Runs GSAP code scoped to an element and reverts it on unmount.
 * Selectors inside `setup` only match within `scope`. With reduced motion
 * the setup still runs (with `reduced: true`) so it can show content statically.
 */
export function useGsap(scope: Ref<HTMLElement | null | undefined>, setup: Setup) {
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    if (!scope.value) return
    mm = gsap.matchMedia(scope.value)
    mm.add(
      { reduced: '(prefers-reduced-motion: reduce)', ok: '(prefers-reduced-motion: no-preference)' },
      (c) => {
        const reduced = Boolean(c.conditions?.reduced)
        if (reduced) gsap.set(scope.value!.querySelectorAll('[data-reveal]'), { opacity: 1, clearProps: 'transform' })
        setup({ gsap, ScrollTrigger, reduced })
      },
    )
  })

  onBeforeUnmount(() => mm?.revert())
}

/** Fades and lifts every `[data-reveal]` inside `scope` as it scrolls into view. */
export function useReveal(scope: Ref<HTMLElement | null | undefined>) {
  useGsap(scope, ({ gsap, ScrollTrigger, reduced }) => {
    if (reduced) return
    ScrollTrigger.batch(scope.value!.querySelectorAll('[data-reveal]'), {
      start: 'top 88%',
      once: true,
      onEnter: els =>
        gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9 }),
    })
  })
}
