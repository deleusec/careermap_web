<template>
  <span class="gradient-text">
    <slot />
  </span>
</template>

<style scoped>
.gradient-text {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(to bottom right, #3B96CB, #4F79D4);
}
</style>
