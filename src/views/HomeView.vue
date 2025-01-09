<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <div class="min-h-screen">
      <p>Home page</p>
      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>
  </AppLayout>
</template>

