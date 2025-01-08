<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useThemeStore } from '@/stores/themeStore';
import NavbarApp from '../NavbarApp.vue';

const themeStore = useThemeStore()

onBeforeMount(() => {
  themeStore.initialize()
})
</script>

<template>
  <div>
    <NavbarApp />

    <main>
      <slot />
    </main>

    <footer>
      <p>© 2021 CareerMap</p>
    </footer>
  </div>
</template>

<style scoped></style>
