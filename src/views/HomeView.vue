<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import TreeApp from '@/components/TreeApp.vue'
</script>

<template>
  <AppLayout>
    <TreeApp />
  </AppLayout>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
