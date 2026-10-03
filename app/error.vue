<script setup lang="ts">
import type { NuxtError } from '#app'
import { Button } from '@/components/ui/button'

const props = defineProps<{ error: NuxtError }>()
useSeoMeta({ title: props.error.statusCode === 404 ? 'Page not found' : 'Error', robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p class="font-mono text-sm text-muted-foreground">{{ error.statusCode }}</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight">
        {{ error.statusCode === 404 ? 'This page went to Henesys.' : 'Something went wrong.' }}
      </h1>
      <p class="mt-4 text-muted-foreground">{{ error.statusCode === 404 ? 'We could not find what you were looking for.' : error.message }}</p>
      <Button class="mt-8" @click="clearError({ redirect: '/' })">Back home</Button>
    </div>
  </NuxtLayout>
</template>
