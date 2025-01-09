<script setup lang="ts">

</script>

<template>
  <div
    class="bg-foreground text-text-foreground px-4 rounded-lg shadow-lg w-full relative"
  >
    <!-- Gradient avec opacité globale -->
    <div
      class="absolute inset-0 rounded-lg"
      :style="{
        backgroundImage: 'radial-gradient(circle at center top, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        opacity: 0.2,
      }"
    ></div>
    <!-- Contenu de la carte -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
