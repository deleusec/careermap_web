<template>
  <div class="p-6">
    <div v-if="loading" class="text-center">
      Chargement...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else>
      <h1 class="text-2xl mb-4">{{ graphData.name }}</h1>
      <AppTree
        :data="transformedData"
        :node-width="150"
        :node-height="60"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppTree from '@/components/TreeApp.vue'

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

const route = useRoute()
const graphData = ref<Node | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Fonction récursive pour extraire tous les nœuds
const extractNodes = (node: Node): any[] => {
  const nodes: any[] = [{
    id: node.id.toString(),
    label: node.name,
    color: getColorByType(node.type)
  }]
  
  const processNodes = (n: Node) => {
    if (n.children) {
      n.children.forEach(child => {
        nodes.push({
          id: child.id.toString(),
          label: child.name,
          color: getColorByType(child.type)
        })
        processNodes(child)
      })
    }
    if (n.parents) {
      n.parents.forEach(parent => {
        nodes.push({
          id: parent.id.toString(),
          label: parent.name,
          color: getColorByType(parent.type)
        })
        processNodes(parent)
      })
    }
  }
  
  processNodes(node)
  return [...new Map(nodes.map(n => [n.id, n])).values()]
}

// Fonction récursive pour extraire tous les liens
const extractLinks = (node: Node): any[] => {
  const links: any[] = []
  
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

const getColorByType = (type: string): string => {
  const colors = {
    formation: '#3498db',
    bac: '#e74c3c',
    career: '#2ecc71'
  }
  return colors[type as keyof typeof colors] || '#95a5a6'
}

const transformedData = computed(() => {
  if (!graphData.value) return { nodes: [], links: [] }
  
  return {
    nodes: extractNodes(graphData.value),
    links: extractLinks(graphData.value)
  }
})

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await axios.get(`http://localhost:5050/api/roadmaps/${id}`)
    graphData.value = response.data
  } catch (err) {
    error.value = "Erreur lors du chargement des données"
  } finally {
    loading.value = false
  }
})

const handleNodeClick = (node: any) => {
  console.log('Node clicked:', node)
}
</script>