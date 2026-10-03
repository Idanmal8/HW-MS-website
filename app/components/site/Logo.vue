<script setup lang="ts">
defineProps<{ withText?: boolean }>()
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img decoding="async" src="/logo.webp" alt="" width="28" height="28" class="size-7 shrink-0 [image-rendering:pixelated]">
    <span v-if="withText" class="text-[15px] font-semibold tracking-tight">Hard Will</span>
  </span>
</template>
