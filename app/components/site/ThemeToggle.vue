<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const mode = useColorMode()
const toggle = () => (mode.preference = mode.value === 'dark' ? 'light' : 'dark')
</script>

<template>
  <Button variant="ghost" size="icon" aria-label="Toggle light and dark theme" @click="toggle">
    <Sun class="size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
    <Moon class="absolute size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
  </Button>
</template>
