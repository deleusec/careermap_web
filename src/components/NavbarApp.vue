<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';
import GithubIcon from './icons/GithubIcon.vue';
import LogoIcon from './icons/LogoIcon.vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <header class="line-height-6 max-h-screen w-full bg-background z-50 flex justify-between items-center px-12 py-4">
    <div class="flex items-center gap-4">
      <LogoIcon class="w-8 h-8" />
      <p class="text-base font-bold">CareerMap</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="px-6 py-2 rounded-md border-none bg-[#131112] text-[#F7F7FF] cursor-pointer">
        S'inscrire
      </button>
      <button class="px-6 py-2 rounded-md border border-[#DEE6EF] bg-transparent text-[#131112] cursor-pointer">
        Se connecter
      </button>
      <GithubIcon class="w-6 h-6" />
      <MoonIcon
        v-if="!themeStore.dark"
        class="w-6 h-6 cursor-pointer"
        @click="toggleTheme"
      />
      <SunIcon
        v-else
        class="w-6 h-6 cursor-pointer"
        @click="toggleTheme"
      />
    </div>
  </header>
</template>

<style scoped>
.bg-background {
  background-color: var(--background);
}

.text-text {
  color: var(--color-text);
}

.border-l {
  border-left: 1px solid var(--color-border);
}
</style>
