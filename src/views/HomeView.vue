<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">

      <h1 class="text-4xl text-center font-medium"
      >Cherche ta <span>CareerMap</span> et trouve ta voie</h1>
      <p class="text-xl">De la formation au métier de tes rêves, découvre chaque étape de ton futur !</p>
      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>
  </AppLayout>
</template>

