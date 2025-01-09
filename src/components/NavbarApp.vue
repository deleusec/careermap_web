<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';
import GithubIcon from './icons/GithubIcon.vue';
import LogoIcon from './icons/LogoIcon.vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import AppButton from './ui/AppButton.vue';

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <header class="w-full h-[60px] bg-background flex justify-between items-center px-12 border-b border-border-foreground">
    <div class="flex items-center gap-4">
      <LogoIcon class="w-8 h-8" />
      <p class="font-medium text-xl">CareerMap</p>
    </div>
    <div class="flex items-center gap-4">
      <AppButton type="primary">S'inscrire</AppButton>
      <AppButton type="secondary">Se connecter</AppButton>
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
