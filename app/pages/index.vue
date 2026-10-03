<script setup lang="ts">
useSeoMeta({
  title: 'Hard Will',
  description:
    'Hard Will is a desktop MapleStory companion for Windows: track your gear, level, bosses, dailies and HEXA progress, read straight from the game window.',
  ogTitle: 'Hard Will · MapleStory progression tracker',
})
useSoftwareSchema()
</script>

<template>
  <div>
    <LandingHero />
    <LandingShowcase />
    <LandingHowItWorks />
    <LandingFaq />
    <LandingSupporters />
    <LandingDownloadCta />
  </div>
</template>
