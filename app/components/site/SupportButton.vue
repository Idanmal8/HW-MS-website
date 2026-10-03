<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { patreonUrl } from '~/data/site'

withDefaults(defineProps<{ size?: 'sm' | 'default' | 'lg', label?: string }>(), { size: 'sm', label: 'Support' })
</script>

<template>
  <Button as-child :size="size" variant="outline">
    <a :href="patreonUrl" target="_blank" rel="noopener" aria-label="Support Hard Will on Patreon">
      <Heart class="fill-current" /> {{ label }}
    </a>
  </Button>
</template>
