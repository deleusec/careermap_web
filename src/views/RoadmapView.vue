<template>
  <div class="p-6 relative">
    <div v-if="loading" class="text-center">
      Chargement...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else>
      <h1 class="text-2xl mb-4">{{ graphData?.name }}</h1>
      <AppTree
        :data="transformedData"
        :node-width="150"
        :node-height="60"
        @node-click="handleNodeClick"
        @node-hover="handleNodeHover"
      />

      <!-- Popup pour le hover -->
      <div v-if="hoveredNode && showPopup"
           class="popup absolute bg-foreground rounded-lg shadow-lg p-4 z-10"
           :style="popupStyle">
        <h3 class="text-lg font-semibold mb-2 text-text-foreground">{{ hoveredNode.label }}</h3>
        <p class="text-text-foreground">{{ hoveredNode.description }}</p>
        <p v-if="hoveredNode.additionalInfo?.duration" class="mt-2 text-text-foreground">
          Durée : {{ hoveredNode.additionalInfo.duration }}
        </p>
      </div>

      <Drawer :open="isDrawerOpen" @close="isDrawerOpen = false">
        <DrawerContent :class="{ 'right-side': isRightSide }">
          <DrawerHeader>
            <DrawerTitle>{{ selectedNode?.label }}</DrawerTitle>
            <DrawerDescription>{{ selectedNode?.description }}</DrawerDescription>
          </DrawerHeader>

          <div class="p-4">
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2">Type</h3>
              <p class="text-gray-600">{{ selectedNode?.type }}</p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2">Catégorie</h3>
              <p class="text-gray-600">{{ selectedNode?.category?.name }}</p>
            </div>

            <div v-if="selectedNode?.additionalInfo" class="space-y-4">
              <!-- Durée -->
              <div v-if="selectedNode.additionalInfo.duration">
                <h3 class="text-lg font-semibold mb-2">Durée</h3>
                <p class="text-gray-600">{{ selectedNode.additionalInfo.duration }}</p>
              </div>

              <!-- Salaire moyen -->
              <div v-if="selectedNode.additionalInfo.average_salary">
                <h3 class="text-lg font-semibold mb-2">Salaire moyen</h3>
                <p class="text-gray-600">{{ selectedNode.additionalInfo.average_salary }}</p>
              </div>

              <!-- Compétences requises -->
              <div v-if="selectedNode.additionalInfo.required_skills?.length">
                <h3 class="text-lg font-semibold mb-2">Compétences requises</h3>
                <ul class="list-disc list-inside text-gray-600">
                  <li v-for="skill in selectedNode.additionalInfo.required_skills"
                      :key="skill">{{ skill }}</li>
                </ul>
              </div>

              <!-- Prérequis -->
              <div v-if="selectedNode.additionalInfo.prerequisites?.length">
                <h3 class="text-lg font-semibold mb-2">Prérequis</h3>
                <ul class="list-disc list-inside text-gray-600">
                  <li v-for="prereq in selectedNode.additionalInfo.prerequisites"
                      :key="prereq">{{ prereq }}</li>
                </ul>
              </div>

              <!-- Spécialités -->
              <div v-if="selectedNode.additionalInfo.specialities?.length">
                <h3 class="text-lg font-semibold mb-2">Spécialités</h3>
                <ul class="list-disc list-inside text-gray-600">
                  <li v-for="spec in selectedNode.additionalInfo.specialities"
                      :key="spec">{{ spec }}</li>
                </ul>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button class="bg-foreground" @click="isDrawerOpen = false">Fermer</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppTree from '@/components/TreeApp.vue'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface Category {
  id: number
  name: string
}

interface Node {
  id: number
  type: string
  name: string
  description: string
  additionalInfo: Record<string, any>
  category: Category
  parents: Node[]
  children: Node[]
}

interface TreeNode {
  id: string
  label: string
  color?: string
  type?: string
  description?: string
  additionalInfo?: {
    duration?: string
    prerequisites?: string[]
    average_salary?: string
    required_skills?: string[]
    specialities?: string[]
    recommended_background?: string[]
  }
  category?: {
    id: number
    name: string
  }
}

const route = useRoute()
const graphData = ref<Node | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const graphContainer = ref<HTMLElement | null>(null)
const isDrawerOpen = ref(false)
const selectedNode = ref<TreeNode | null>(null)
const hoveredNode = ref<TreeNode | null>(null)
const showPopup = ref(false)
const popupPosition = ref({ x: 0, y: 0 })
const isRightSide = ref(false)

const getColorByType = (type: string): string => {
  const colors = {
    formation: '#3498db',
    bac: '#e74c3c',
    career: '#2ecc71'
  }
  return colors[type as keyof typeof colors] || '#95a5a6'
}

const extractNodes = (node: Node): TreeNode[] => {
  const nodes: TreeNode[] = [{
    id: node.id.toString(),
    label: node.name,
    color: getColorByType(node.type),
    type: node.type,
    description: node.description,
    additionalInfo: node.additionalInfo,
    category: node.category
  }]

  const processNodes = (n: Node) => {
    if (n.children) {
      n.children.forEach(child => {
        nodes.push({
          id: child.id.toString(),
          label: child.name,
          color: getColorByType(child.type),
          type: child.type,
          description: child.description,
          additionalInfo: child.additionalInfo,
          category: child.category
        })
        processNodes(child)
      })
    }
    if (n.parents) {
      n.parents.forEach(parent => {
        nodes.push({
          id: parent.id.toString(),
          label: parent.name,
          color: getColorByType(parent.type),
          type: parent.type,
          description: parent.description,
          additionalInfo: parent.additionalInfo,
          category: parent.category
        })
        processNodes(parent)
      })
    }
  }

  processNodes(node)
  return [...new Map(nodes.map(n => [n.id, n])).values()]
}

const extractLinks = (node: Node): { source: string; target: string; }[] => {
  const links: { source: string; target: string; }[] = []

  const processLinks = (n: Node) => {
    if (n.children) {
      n.children.forEach(child => {
        links.push({
          source: n.id.toString(),
          target: child.id.toString()
        })
        processLinks(child)
      })
    }
    if (n.parents) {
      n.parents.forEach(parent => {
        links.push({
          source: parent.id.toString(),
          target: n.id.toString()
        })
        processLinks(parent)
      })
    }
  }

  processLinks(node)
  return links
}

const transformedData = computed(() => {
  if (!graphData.value) return { nodes: [], links: [] }

  return {
    nodes: extractNodes(graphData.value),
    links: extractLinks(graphData.value)
  }
})

const handleNodeHover = (event: MouseEvent, node: TreeNode | null) => {
  if (!node) {
    showPopup.value = false
    return
  }

  hoveredNode.value = node
  showPopup.value = true

  if (event && graphContainer.value) {
    const rect = graphContainer.value.getBoundingClientRect()
    popupPosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
}

const handleNodeClick = (node: TreeNode, event: MouseEvent) => {
  selectedNode.value = node
  if (event && graphContainer.value) {
    const rect = graphContainer.value.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    isRightSide.value = clickX > rect.width / 2
  }
  isDrawerOpen.value = true
}

const popupStyle = computed(() => ({
  left: `${popupPosition.value.x + 20}px`,
  top: `${popupPosition.value.y + 20}px`
}))

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roadmaps/${id}`)
    graphData.value = response.data
  } catch (err) {
    console.error(err)
    error.value = "Erreur lors du chargement des données"
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.popup {
  min-width: 200px;
  max-width: 300px;
}

.right-side {
  @apply right-0;
}
.node:mouseout .popup {
  display: none;
}
</style>
