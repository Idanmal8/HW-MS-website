<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs } from '~/data/site'

const root = ref<HTMLElement | null>(null)
useReveal(root)

useSchemaOrg([
  defineWebPage({ '@type': ['WebPage', 'FAQPage'] }),
  ...faqs.map(f => defineQuestion({ name: f.q, acceptedAnswer: f.a })),
])
</script>

<template>
  <section id="faq" ref="root" class="scroll-mt-20 py-24 md:py-32" aria-labelledby="faq-title">
    <div class="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.6fr]">
      <div>
        <p data-reveal class="font-mono text-xs tracking-widest text-muted-foreground uppercase">FAQ</p>
        <h2 id="faq-title" data-reveal class="mt-3 text-4xl font-semibold tracking-tight">Questions, answered.</h2>
        <p data-reveal class="mt-4 text-muted-foreground">
          Can't find what you need? The <NuxtLink to="/guides" class="text-foreground underline underline-offset-4">guides</NuxtLink> go step by step.
        </p>
      </div>
      <!-- Answers stay in the DOM when collapsed so crawlers read them. -->
      <Accordion type="single" collapsible data-reveal :unmount-on-hide="false">
        <AccordionItem v-for="(f, i) in faqs" :key="f.q" :value="`q${i}`">
          <AccordionTrigger class="text-left text-base">{{ f.q }}</AccordionTrigger>
          <AccordionContent class="text-muted-foreground leading-relaxed">{{ f.a }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>
