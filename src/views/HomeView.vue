<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <div class="min-h-[calc(100vh-50px)] ">
      <p>Home page</p>
      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>
  </AppLayout>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: var(--foreground);
  background-color: var(--background);
}
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
