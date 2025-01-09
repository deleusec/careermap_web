<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Accordion from './ui/accordion/Accordion.vue';
import AccordionContent from './ui/accordion/AccordionContent.vue';
import AccordionItem from './ui/accordion/AccordionItem.vue';
import AccordionTrigger from './ui/accordion/AccordionTrigger.vue';
import AppCard from './ui/AppCard.vue';
import axios from 'axios';


const categories = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    // Récupérer les catégories
    const categoryResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/categories`
    );
    const fetchedCategories = categoryResponse.data;

    // Pour chaque catégorie, récupérer les entités associées
    const promises = fetchedCategories.map(async (category: any) => {
      const entityResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/entities/${category.id}`
      );
      return { ...category, entities: entityResponse.data };
    });

    categories.value = await Promise.all(promises);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
});

// Redirection vers la page de roadmap
const goToRoadmap = (id: number) => {
  router.push(`/roadmap/${id}`);
};
</script>

<template>
  <div class="w-full h-full max-w-[1200px] flex items-center justify-center">
    <!-- Colonne de gauche -->
    <div class="w-1/2 h-full flex flex-col items-center justify-center gap-4 p-4 -translate-y-10">
      <AppCard
        v-for="(category, index) in categories.filter((_, i) => i % 2 === 0)"
        :key="category.id"
      >
        <Accordion type="single" collapsible>
          <AccordionItem :value="'category-' + category.id">
            <!-- Titre de la catégorie -->
            <AccordionTrigger>{{ category.name }}</AccordionTrigger>
            <AccordionContent>
              <p class="text-gray-500">{{ category.description }}</p>
              <!-- Liste des entités -->
              <ul>
                <li
                  v-for="entity in category.entities"
                  :key="entity.id"
                  @click="goToRoadmap(entity.id)"
                  class="cursor-pointer hover:underline text-primary mt-2"
                >
                  <strong>{{ entity.name }}</strong>
                  <p class="text-sm text-gray-400">{{ entity.description }}</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AppCard>
    </div>

    <!-- Colonne de droite -->
    <div class="w-1/2 h-full flex flex-col items-center justify-center gap-4 p-4 translate-y-10">
      <AppCard
        v-for="(category, index) in categories.filter((_, i) => i % 2 !== 0)"
        :key="index"
      >
        <Accordion type="single" collapsible>
          <AccordionItem :value="'category-' + category.id">
            <!-- Titre de la catégorie -->
            <AccordionTrigger>{{ category.name }}</AccordionTrigger>
            <AccordionContent>
              <p class="text-gray-500">{{ category.description }}</p>
              <!-- Liste des entités -->
              <ul>
                <li
                  v-for="entity in category.entities"
                  :key="entity.id"
                  @click="goToRoadmap(entity.id)"
                  class="cursor-pointer hover:underline text-primary mt-2"
                >
                  <strong>{{ entity.name }}</strong>
                  <p class="text-sm text-gray-400">{{ entity.description }}</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AppCard>
    </div>
  </div>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  margin-bottom: 1rem;
}
</style>
