<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useThemeStore } from '@/stores/themeStore';
import NavbarApp from '../NavbarApp.vue';
import AppFooter from '../AppFooter.vue';

const themeStore = useThemeStore()

onBeforeMount(() => {
  themeStore.initialize()
})
</script>

<template>
  <div class="relative">
    <div>
      <img src="@/assets/images/home-top-gradient.png" alt="Home top gradient" class="absolute top-0 left-0 w-full -z-10 object-cover pointer-events-none" />
    </div>

    <NavbarApp />

    <main class="min-h-screen">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped></style>
