<script setup lang="ts">
import Accordion from './ui/accordion/Accordion.vue'
import AccordionContent from './ui/accordion/AccordionContent.vue'
import AccordionItem from './ui/accordion/AccordionItem.vue'
import AccordionTrigger from './ui/accordion/AccordionTrigger.vue'
import AppCard from './ui/AppCard.vue'
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-full h-full flex flex-col items-center justify-center gap-4">
      <AppCard>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Informatique</AccordionTrigger>
            <AccordionContent>
              <AppCategoryList />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AppCard>
      <AppCard> hello </AppCard>
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center gap-4">
      <AppCard> hello </AppCard>
      <AppCard> hello </AppCard>
    </div>
  </div>
</template>

<style scoped></style>
