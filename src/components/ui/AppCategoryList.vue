<script setup lang="ts">
interface Roadmap {
  id: number
  title: string
  description: string
  category: string
  image: string
}
defineProps({
  roadmaps: Roadmap[]
})

</script>

<template>
  <div>
    <div v-for="roadmap in roadmaps" :key="roadmap.id">

  </div>
</template>

<style scoped>

</style>
