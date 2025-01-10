<script setup lang="ts">
import { ref } from 'vue'
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="bg-foreground dark:bg-background pt-16 pb-2 px-4 border-t border-border">
    <div class="max-w-7xl mx-auto">
      <!-- Newsletter Section -->
      <div class="text-left justify-center gap-64 mx-auto mb-16 flex items-center">
        <div class="">
          <h2 class="text-text-foreground dark:text-text text-3xl font-medium mb-2">Restez connectés avec nous</h2>
          <p class="text-text-foreground dark:text-text">Toutes les actualités Careermap, directement par mail.</p>
        </div>
        <!-- Email Form -->
        <div class="w-80 max-h-10 flex">
          <input
            type="email"
            placeholder="Adresse mail"
            class="flex-1 px-4 py-2 rounded-l-full bg-foreground dark:bg-background text-border border border-border focus:outline-none focus:border-border"
          />
          <button
            class="bg-zinc-800 px-6 py-2 rounded-r-full border border-l-transparent border-border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-border"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-text-foreground dark:text-text text-sm">
        Released under the MIT License. (e1b520c4) - Copyright © {{ currentYear }}
      </div>
    </div>
  </footer>
</template>
