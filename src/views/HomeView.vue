<script setup lang="ts">
import LogoNeonIcon from '@/components/icons/LogoNeonIcon.vue';
import AppLayout from '@/components/layouts/AppLayout.vue';
import AppGradientText from '@/components/ui/AppGradientText.vue';
</script>

<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">

      <h1 class="text-4xl text-center font-medium"
      >Cherche ta <AppGradientText>CareerMap</AppGradientText> et trouve ta voie</h1>
      <p class="text-base mt-4">De la formation au métier de tes rêves, découvre chaque étape de ton futur !</p>
      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>

    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
      <LogoNeonIcon class="w-52 h-52" />

    </div>
  </AppLayout>
</template>

