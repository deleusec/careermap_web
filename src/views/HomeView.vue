<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center content-center min-h-[calc(100vh-60px)]">

      <h1 class="text-4xl text-center font-medium"
      >Cherche ta <span>CareerMap</span> et trouve ta voie</h1>
      <p class="text-xl">De la formation au métier de tes rêves, découvre chaque étape de ton futur !</p>
      <Searchbar @search="onSearch"/>
      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import Searchbar from '@/components/search/Searchbar.vue';

const onSearch = (query: string) => {
  console.log('Recherche :', query)
}
</script>
