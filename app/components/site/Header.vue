<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { Download, Menu } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav } from '~/data/site'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 8)
const open = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="scrolled ? 'border-border bg-background' : 'border-transparent bg-transparent'"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
      <NuxtLink to="/" aria-label="Hard Will home" class="rounded-md">
        <SiteLogo with-text />
      </NuxtLink>

      <nav aria-label="Main" class="hidden md:block">
        <ul class="flex items-center gap-1 text-sm">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-1.5">
        <SiteThemeToggle />
        <SiteSupportButton class="hidden sm:inline-flex" />
        <Button as-child size="sm" class="hidden sm:inline-flex">
          <NuxtLink to="/download"><Download /> Download</NuxtLink>
        </Button>

        <Sheet v-model:open="open">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-72">
            <SheetHeader>
              <SheetTitle><SiteLogo with-text /></SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" class="px-4">
              <ul class="flex flex-col gap-1">
                <li v-for="item in nav" :key="item.to">
                  <NuxtLink :to="item.to" class="block rounded-md px-3 py-2.5 hover:bg-accent" @click="open = false">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
              <Button as-child class="mt-6 w-full">
                <NuxtLink to="/download" @click="open = false"><Download /> Download</NuxtLink>
              </Button>
              <SiteSupportButton size="default" label="Support on Patreon" class="mt-2 w-full" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
