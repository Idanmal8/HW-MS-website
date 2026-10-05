<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

// A legal document from content/legal/<doc>.md, styled like the guides.
const props = defineProps<{ doc: 'privacy' | 'terms' }>()

const { data: page } = await useAsyncData(`legal-${props.doc}`, () =>
  queryCollection('legal').path(`/legal/${props.doc}`).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const p = page.value
useSeoMeta({ title: p.title, description: p.description })
useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: 'Home', item: '/' }, { name: p.title, item: `/${props.doc}` }] })])
</script>

<template>
  <article class="mx-auto max-w-2xl px-5 py-16 md:py-24">
    <header>
      <h1 class="text-4xl font-semibold tracking-tighter text-balance md:text-5xl">{{ p.title }}</h1>
      <p class="mt-4 text-lg text-muted-foreground">{{ p.description }}</p>
      <p class="mt-4 font-mono text-xs text-muted-foreground">
        Updated <time :datetime="p.updated">{{ p.updated }}</time>
      </p>
    </header>
    <Separator class="my-10" />
    <div class="prose-hw">
      <ContentRenderer :value="p" />
    </div>
  </article>
</template>
