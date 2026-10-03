import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })

  // Route changes swap page height; let ScrollTrigger re-measure.
  const router = useRouter()
  router.afterEach(() => nextTick(() => ScrollTrigger.refresh()))
})
