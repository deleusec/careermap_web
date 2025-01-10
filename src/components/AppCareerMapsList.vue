<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Accordion from './ui/accordion/Accordion.vue';
import AccordionContent from './ui/accordion/AccordionContent.vue';
import AccordionItem from './ui/accordion/AccordionItem.vue';
import AccordionTrigger from './ui/accordion/AccordionTrigger.vue';
import AppCard from './ui/AppCard.vue';
import axios from 'axios';

interface Entity {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  entities: Entity[];
}

const categories = ref<Category[]>([]);
const router = useRouter();

onMounted(async () => {
  try {
    const categoryResponse = await axios.get<Category[]>(
      `${import.meta.env.VITE_API_URL}/api/categories`
    );
    const fetchedCategories = categoryResponse.data;

    const promises = fetchedCategories.map(async (category) => {
      const entityResponse = await axios.get<Entity[]>(
        `${import.meta.env.VITE_API_URL}/api/entities/${category.id}`
      );
      return { ...category, entities: entityResponse.data };
    });
    console.log(promises)

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
  <Accordion type="single" collapsible class="w-full h-auto max-w-[1200px] flex items-center justify-center">
    <!-- Colonne de gauche -->
    <div class="w-1/2 h-full flex flex-col items-center justify-center gap-4 p-4 -translate-y-10">
      <AppCard
        v-for="(category) in categories.filter((_, i) => i % 2 === 0)"
        :key="category.id"
      >
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
                  class="cursor-pointer hover:underline text-text-foreground mt-2"
                >
                  <strong>{{ entity.name }}</strong>
                  <p class="text-sm text-gray-400">{{ entity.description }}</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      </AppCard>
    </div>

    <!-- Colonne de droite -->
    <div class="w-1/2 h-full flex flex-col items-center justify-center gap-4 p-4 translate-y-10">
      <AppCard
        v-for="(category, index) in categories.filter((_, i) => i % 2 !== 0)"
        :key="index"
      >

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
                  class="cursor-pointer hover:underline text-text-foreground mt-2"
                >
                  <strong>{{ entity.name }}</strong>
                  <p class="text-sm text-gray-400">{{ entity.description }}</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
      </AppCard>
    </div>
  </Accordion>
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
