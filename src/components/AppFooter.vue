<template>
  <footer class="bg-zinc-900 py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Newsletter Section -->
      <div class="text-left justify-center gap-64 mx-auto mb-16 flex items-center">
        <div class="">
          <h2 class="text-white text-3xl font-medium mb-2">
            Restez connectés avec nous
          </h2>
          <p class="text-gray-400">
            Toutes les actualités Careermap, directement par mail.
          </p>
        </div>
        <!-- Email Form -->
        <div class="w-80 max-h-10 flex">
          <input
            type="email"
            placeholder="Adresse mail"
            class="flex-1 px-4 py-2 rounded-l-full bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-white"
          />
          <button class="bg-zinc-800 px-6 py-2 rounded-r-full border border-l-0 border-zinc-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-2 w-5 text-white"
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
      <div class="text-center text-gray-500 text-sm">
        Released under the MIT License. (e1b520c4) - Copyright © {{ currentYear }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>