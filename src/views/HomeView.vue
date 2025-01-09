<script setup lang="ts">
import LogoNeonIcon from '@/components/icons/LogoNeonIcon.vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import AppGradientText from '@/components/ui/AppGradientText.vue'
import AppSearchbar from '@/components/search/AppSearchbar.vue'
import AppDotPattern from '@/components/ui/AppDotPattern.vue'
import { cn } from '@/lib/utils'
import LinesTreeIcon from '@/components/icons/LinesTreeIcon.vue'
import AppCareerMapsList from '@/components/AppCareerMapsList.vue'

const onSearch = (query: string) => {
  console.log('Recherche :', query)
}
</script>

<template>
  <AppLayout>
    <div
      class="flex flex-col items-center justify-center content-center min-h-[calc(100vh-60px)] relative"
    >
      <AppDotPattern
        class="absolute inset-y-12"
        :class="cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')"
      />
      <h1 class="text-4xl text-center font-medium">
        Cherche ta <AppGradientText>CareerMap</AppGradientText> et trouve ta voie
      </h1>
      <p class="text-base mt-4">
        De la formation au métier de tes rêves, découvre chaque étape de ton futur !
      </p>

      <AppSearchbar @search="onSearch" />

      <RouterLink to="/roadmap/1" class="mt-4 text-blue-500 underline">Go to Roadmap</RouterLink>
    </div>

    <div class="flex flex-col items-center justify-start min-h-[calc(100vh-60px)] w-full h-full">
      <LogoNeonIcon class="w-52 h-52" />
      <div
        class="py-12 relative w-full h-full min-h-[calc(100vh-60px)] flex flex-col items-center justify-start"
      >
        <div class="w-full z-10 flex flex-col gap-[150px] relative">
          <LinesTreeIcon class="w-[40%] self-center" />
          <img
            src="@/assets/images/gradients.png"
            class="w-[100%] top-1/2 absolute z-0 -translate-y-1/2 dark:opacity-50"
          />
          <LinesTreeIcon class="w-[40%] h-auto rotate-180 opacity-50 self-center" />

          <div
            class="flex flex-col items-center justify-start gap-4 absolute z-10 top-0 left-0 right-0 bottom-0"
          >
            <p class="text-3xl font-medium">CareerMaps les plus consultées</p>
            <div class="w-full h-full flex flex-col items-center justify-center">
              <AppCareerMapsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
