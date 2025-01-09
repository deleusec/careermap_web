<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  type: String,
  disabled: Boolean,
  onClick: Function as PropType<() => void>,
})
</script>

<template>
  <button
    :class="[
      'min-w-[150px] px-3 py-2 rounded-xl  ',
      type === 'primary' ? 'border-none bg-foreground text-text-foreground' : 'border border-border text-text',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80',
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
