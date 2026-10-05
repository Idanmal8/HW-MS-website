<script setup lang="ts">
import { Apple, Download, Monitor } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { type Platform, platformLabel } from '~/stores/release'

defineProps<{ size?: 'default' | 'lg' }>()

const release = useReleaseStore()
onMounted(() => release.detectPlatform())

const icons = { windows: Monitor, macos: Apple }
// The detected platform goes first; before detection Windows leads.
const order = computed<Platform[]>(() => (release.primary === 'macos' ? ['macos', 'windows'] : ['windows', 'macos']))
// Lead with an available build even if the visitor is on the other platform.
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <template v-for="(p, i) in order" :key="p">
      <Button
        v-if="release.assets[p].available" as-child :size="size ?? 'lg'"
        :variant="i === 0 ? 'default' : 'outline'" class="h-11 px-6"
      >
        <a :href="release.assets[p].url" :download="release.assets[p].fileName">
          <component :is="icons[p]" /> Download for {{ platformLabel[p] }}
          <span v-if="release.sizeLabel(p)" class="font-mono text-xs opacity-60">{{ release.sizeLabel(p) }}</span>
        </a>
      </Button>
      <Button v-else :size="size ?? 'lg'" variant="outline" class="h-11 px-6" disabled>
        <component :is="icons[p]" /> {{ platformLabel[p] }} · coming soon
      </Button>
    </template>
  </div>
  <p class="mt-4 text-center font-mono text-xs text-muted-foreground">
    <Download class="mr-1 inline size-3" aria-hidden="true" />v{{ release.version }} · {{ release.channel }} · {{ release.date }}
    · <NuxtLink to="/changelog" class="underline underline-offset-4 hover:text-foreground">What's new</NuxtLink>
  </p>
</template>
