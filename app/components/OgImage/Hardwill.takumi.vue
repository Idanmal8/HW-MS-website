<script setup lang="ts">
withDefaults(defineProps<{ title?: string, description?: string, eyebrow?: string }>(), {
  title: 'Every star, flame and level. Tracked for you.',
  description: 'The desktop MapleStory progression tracker.',
  eyebrow: 'Hard Will',
})
</script>

<template>
  <div
    class="flex h-full w-full flex-col justify-between p-[72px]"
    style="background-color: #0a0a0a; color: #fafafa; background-image: linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 56px 56px;"
  >
    <div class="flex items-center" style="gap: 20px;">
      <img src="/logo.png" width="72" height="72" style="image-rendering: pixelated;">
      <span style="font-size: 34px; font-weight: 600; letter-spacing: -0.02em;">{{ eyebrow }}</span>
    </div>
    <div class="flex flex-col" style="gap: 24px;">
      <span style="font-size: 76px; font-weight: 600; line-height: 1.05; letter-spacing: -0.045em; max-width: 1000px;">{{ title }}</span>
      <span style="font-size: 32px; color: #a3a3a3; line-height: 1.4; max-width: 980px;">{{ description }}</span>
    </div>
  </div>
</template>
