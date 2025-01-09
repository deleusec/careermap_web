<template>
  <div class="p-6">
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-2">Démonstrateur de Graphe Organisationnel</h1>
      <p class="text-gray-600">
        Visualisation de structures organisationnelles complexes avec support de parents multiples
      </p>
    </div>

    <!-- Contrôles -->
    <div class="mb-6 flex gap-4 flex-wrap">
      <button
        v-for="example in examples"
        :key="example.id"
        @click="selectExample(example)"
        class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        :class="{ 'bg-blue-700': currentExample?.id === example.id }"
      >
        {{ example.name }}
      </button>
    </div>

    <!-- Description de l'exemple -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <p class="text-gray-700">{{ currentExample?.description }}</p>
    </div>

    <!-- Graphe -->
    <div class="border rounded-lg shadow-lg bg-white">
      <MultiParentGraph
        v-if="currentExample"
        :data="currentExample.data"
        :node-width="120"
        :node-height="50"
        @node-click="handleNodeClick"
      />
    </div>

    <!-- Informations sur le nœud sélectionné -->
    <div 
      v-if="selectedNode"
      class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
    >
      <h2 class="text-lg font-semibold mb-2">Nœud sélectionné</h2>
      <p><strong>ID:</strong> {{ selectedNode.id }}</p>
      <p><strong>Label:</strong> {{ selectedNode.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MultiParentGraph from '@/components/TreeApp.vue' 

interface GraphNode {
  id: string
  label: string
  color?: string
}

interface GraphData {
  nodes: GraphNode[]
  links: { source: string; target: string }[]
}

interface Example {
  id: string
  name: string
  description: string
  data: GraphData
}

// Exemples de données
const examples = ref<Example[]>([
  {
    id: 'simple',
    name: 'Structure Simple',
    description: 'Un exemple simple avec deux parents et un enfant commun',
    data: {
      nodes: [
        { id: '1', label: 'Directeur A', color: '#e74c3c' },
        { id: '2', label: 'Directeur B', color: '#2ecc71' },
        { id: '3', label: 'Chef Projet', color: '#9b59b6' },
        { id: '4', label: 'Développeur', color: '#3498db' }
      ],
      links: [
        { source: '1', target: '3' },
        { source: '2', target: '3' },
        { source: '3', target: '4' }
      ]
    }
  },
  {
    id: 'complex',
    name: 'Structure Complexe',
    description: 'Un exemple plus complexe avec plusieurs niveaux et relations croisées',
    data: {
      nodes: [
        { id: '1', label: 'CEO', color: '#e74c3c' },
        { id: '2', label: 'CTO', color: '#2ecc71' },
        { id: '3', label: 'CFO', color: '#9b59b6' },
        { id: '4', label: 'Tech Lead', color: '#3498db' },
        { id: '5', label: 'UX Lead', color: '#f1c40f' },
        { id: '6', label: 'Dev Team', color: '#1abc9c' }
      ],
      links: [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
        { source: '2', target: '4' },
        { source: '2', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' }
      ]
    }
  },
  {
    id: 'matrix',
    name: 'Structure Matricielle',
    description: 'Une organisation matricielle où les employés reportent à plusieurs managers',
    data: {
      nodes: [
        { id: '1', label: 'Dir. Produit', color: '#e74c3c' },
        { id: '2', label: 'Dir. Tech', color: '#2ecc71' },
        { id: '3', label: 'PM 1', color: '#9b59b6' },
        { id: '4', label: 'PM 2', color: '#3498db' },
        { id: '5', label: 'Dev 1', color: '#f1c40f' },
        { id: '6', label: 'Dev 2', color: '#1abc9c' }
      ],
      links: [
        { source: '1', target: '3' },
        { source: '1', target: '4' },
        { source: '2', target: '5' },
        { source: '2', target: '6' },
        { source: '3', target: '5' },
        { source: '3', target: '6' },
        { source: '4', target: '5' },
        { source: '4', target: '6' }
      ]
    }
  }
])

const currentExample = ref<Example>(examples.value[0])
const selectedNode = ref<GraphNode | null>(null)

const selectExample = (example: Example) => {
  currentExample.value = example
  selectedNode.value = null
}

const handleNodeClick = (node: GraphNode) => {
  selectedNode.value = node
  console.log('Node clicked:', node)
}
</script>