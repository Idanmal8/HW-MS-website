<script setup lang="ts">
const config = useRuntimeConfig().public

useHead({
  titleTemplate: t => (!t || t === 'Hard Will' ? 'Hard Will · MapleStory progression tracker' : t.includes('Hard Will') ? t : `${t} · Hard Will`),
  // Lets CSS hide [data-reveal] only when JS (and so GSAP) will show it again.
  script: [{ innerHTML: 'document.documentElement.classList.add("js")', tagPosition: 'head' }],
  meta: [
    { name: 'theme-color', content: '#0a0a0a' },
    ...(config.googleSiteVerification ? [{ name: 'google-site-verification', content: config.googleSiteVerification }] : []),
    ...(config.bingSiteVerification ? [{ name: 'msvalidate.01', content: config.bingSiteVerification }] : []),
  ],
  link: [{ rel: 'alternate', type: 'text/plain', title: 'LLM summary', href: '/llms.txt' }],
})

defineOgImage('Hardwill')

useSchemaOrg([
  defineWebSite({ name: 'Hard Will' }),
  defineWebPage(),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
