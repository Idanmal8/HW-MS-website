import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    guides: defineCollection({
      type: 'page',
      source: 'guides/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
        updated: z.string(),
        readingMinutes: z.number().optional(),
        // Present on step-by-step guides; emitted as HowTo structured data.
        steps: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
        sitemap: defineSitemapSchema(),
      }),
    }),
  },
})
