<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { Separator } from '@/components/ui/separator'

const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, ''))

const { data: page } = await useAsyncData(`guide-${path.value}`, () => queryCollection('guides').path(path.value).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true })

const { data: surround } = await useAsyncData(`guide-surround-${path.value}`, () =>
  queryCollectionItemSurroundings('guides', path.value, { fields: ['title', 'description'] }).order('order', 'ASC'))

const g = page.value
useSeoMeta({
  title: g.title,
  description: g.description,
  ogType: 'article',
  articleModifiedTime: g.updated,
})
defineOgImage('Hardwill', { title: g.title, description: g.description, eyebrow: 'Hard Will · Guide' })
useSchemaOrg([
  defineBreadcrumb({ itemListElement: [
    { name: 'Home', item: '/' }, { name: 'Guides', item: '/guides' }, { name: g.title, item: path.value },
  ] }),
  defineArticle({ '@type': 'TechArticle', headline: g.title, description: g.description, dateModified: g.updated, datePublished: g.updated, author: { '@id': '#identity' } }),
  ...(g.steps?.length
    ? [defineHowTo({
        name: g.title,
        description: g.description,
        totalTime: g.readingMinutes ? `PT${g.readingMinutes}M` : undefined,
        step: g.steps.map(s => ({ name: s.name, text: s.text })),
      })]
    : []),
])

const toc = computed(() => g.body?.toc?.links ?? [])

const root = ref<HTMLElement | null>(null)
useGsap(root, ({ gsap, reduced }) => {
  if (reduced) return
  gsap.from(root.value!.querySelectorAll('[data-guide-head] > *'), { opacity: 0, y: 20, stagger: 0.08 })
  gsap.to(root.value!.querySelector('[data-read-progress]'), {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: root.value!.querySelector('[data-guide-body]'), start: 'top 80px', end: 'bottom bottom', scrub: true },
  })
})
</script>

<template>
  <div ref="root">
    <div data-read-progress class="fixed inset-x-0 top-16 z-40 h-px origin-left scale-x-0 bg-foreground" aria-hidden="true" />

    <article class="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1fr_220px]">
      <div class="min-w-0">
        <nav aria-label="Breadcrumb" class="text-sm text-muted-foreground">
          <NuxtLink to="/guides" class="inline-flex items-center gap-1.5 hover:text-foreground"><ArrowLeft class="size-3.5" /> All guides</NuxtLink>
        </nav>
        <header data-guide-head class="mt-8 max-w-2xl">
          <h1 class="text-4xl font-semibold tracking-tighter text-balance md:text-5xl">{{ g.title }}</h1>
          <p class="mt-4 text-lg text-muted-foreground">{{ g.description }}</p>
          <p class="mt-4 font-mono text-xs text-muted-foreground">
            Updated <time :datetime="g.updated">{{ g.updated }}</time><template v-if="g.readingMinutes"> · {{ g.readingMinutes }} min read</template>
          </p>
        </header>
        <Separator class="my-10" />
        <div data-guide-body class="prose-hw max-w-2xl">
          <ContentRenderer :value="g" />
        </div>

        <nav v-if="surround" aria-label="More guides" class="mt-16 grid max-w-2xl gap-3 sm:grid-cols-2">
          <NuxtLink v-if="surround[0]" :to="surround[0].path" class="rounded-xl border p-4 hover:border-foreground/30">
            <span class="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft class="size-3" /> Previous</span>
            <span class="mt-1 block text-sm font-medium">{{ surround[0].title }}</span>
          </NuxtLink>
          <NuxtLink v-if="surround[1]" :to="surround[1].path" class="rounded-xl border p-4 text-right hover:border-foreground/30 sm:col-start-2">
            <span class="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ArrowRight class="size-3" /></span>
            <span class="mt-1 block text-sm font-medium">{{ surround[1].title }}</span>
          </NuxtLink>
        </nav>
      </div>

      <aside v-if="toc.length" class="max-lg:hidden">
        <div class="sticky top-28">
          <p class="font-mono text-xs tracking-widest text-muted-foreground uppercase">On this page</p>
          <ul class="mt-4 space-y-2 border-l text-sm">
            <li v-for="l in toc" :key="l.id">
              <a :href="`#${l.id}`" class="-ml-px block border-l border-transparent pl-4 text-muted-foreground hover:border-foreground hover:text-foreground">{{ l.text }}</a>
            </li>
          </ul>
        </div>
      </aside>
    </article>
  </div>
</template>
