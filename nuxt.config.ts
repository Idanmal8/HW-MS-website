import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://hard-will.vercel.app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    'shadcn-nuxt',
  ],

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle deps that are only imported from client plugins/components.
    // Otherwise Vite finds them on first page load, re-optimizes, and the page
    // fails with "504 Outdated Optimize Dep".
    optimizeDeps: {
      include: [
        'gsap', 'gsap/ScrollTrigger', 'gsap/SplitText',
        '@lucide/vue', 'reka-ui', '@vueuse/core', '@unhead/schema-org/vue',
        'class-variance-authority', 'clsx', 'tailwind-merge',
      ],
    },
  },

  // 3000 is taken by other local projects.
  devServer: { port: 3010 },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    // Hard Will API base URL (NUXT_API_URL), read at build time for /supporters.
    apiUrl: '',
    public: {
      // Search Console: the content value of the HTML-tag verification method.
      googleSiteVerification: '',
      bingSiteVerification: '',
    },
  },

  // Every page is pre-rendered to static HTML, so crawlers and AI engines
  // read the full content without running JavaScript.
  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/sitemap.xml', '/robots.txt'] },
  },

  site: {
    url: siteUrl,
    name: 'Hard Will',
    description:
      'Hard Will is a MapleStory companion for Windows: track your gear, level, bosses, dailies and HEXA progress, read straight from the game window.',
    defaultLocale: 'en',
    // Keep previews and local builds out of Google until the real domain ships.
    indexable: process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true,
  },

  robots: {
    groups: [
      // Answer engines are welcome: being quoted by them is the point of AEO.
      {
        userAgent: [
          'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User',
          'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended',
          'Bingbot', 'Googlebot',
        ],
        allow: ['/'],
      },
    ],
  },

  sitemap: {
    zeroRuntime: true,
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Hard Will',
      url: siteUrl,
      logo: '/logo.png',
    },
  },

  ogImage: {
    zeroRuntime: true,
  },

  linkChecker: { enabled: false },

  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: { toc: { depth: 3 }, highlight: { theme: { default: 'github-light', dark: 'github-dark' } } },
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'hw-color-mode',
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})
