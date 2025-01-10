<template>
  <div ref="graphContainer" class="w-full h-[800px]" />
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import * as dagreD3 from 'dagre-d3'
import { onMounted, ref, watch } from 'vue'

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

interface TreeData {
  nodes: TreeNode[]
  links: { source: string; target: string }[]
}

const props = defineProps<{
  data: TreeData
  nodeWidth?: number
  nodeHeight?: number
}>()

const emit = defineEmits<{
  (e: 'nodeClick', node: TreeNode, event: MouseEvent): void
  (e: 'node-hover', event: MouseEvent, node: TreeNode | null): void
}>()

const graphContainer = ref<HTMLElement | null>(null)

const createGraph = () => {
  if (!graphContainer.value || !props.data.nodes.length) return

  d3.select(graphContainer.value).selectAll('*').remove()

  const g = new dagreD3.graphlib.Graph()
    .setGraph({
      rankdir: 'LR',
      nodesep: 70,
      ranksep: 70,
      marginx: 40,
      marginy: 40
    })
    .setDefaultEdgeLabel(() => ({}))

  props.data.nodes.forEach(node => {
    g.setNode(node.id, {
      label: node.label,
      width: props.nodeWidth || 150,
      height: props.nodeHeight || 60,
      rx: 8,
      ry: 8,
      style: `fill: ${node.color || '#3498db'}`
    })
  })

  props.data.links.forEach(link => {
    g.setEdge(link.source, link.target, {
      style: 'stroke: #3498db; stroke-width: 2px; fill: none;',
      arrowheadStyle: 'fill: #3498db;',
    })
  })

  const svg = d3.select(graphContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 1200 800')
    .attr('preserveAspectRatio', 'xMidYMid meet')

  const inner = svg.append('g')

  const zoom = d3.zoom()
    .on('zoom', (event) => {
      inner.attr('transform', event.transform)
    })

  svg.call(zoom)

  const render = new dagreD3.render()
  render(inner, g)

  animateLinks(inner)

  const initialScale = 0.75
  svg.call(zoom.transform, d3.zoomIdentity
    .translate((1200 - g.graph().width * initialScale) / 2, 20)
    .scale(initialScale))

  inner.selectAll('g.node')
    .on('mouseover', (event, d) => {
      const node = props.data.nodes.find(n => n.id === d)
      if (node) {
        emit('node-hover', event, node)
      }
    })
    .on('mouseout', (event) => {
      emit('node-hover', event, null)
    })
    .on('click', (event, d) => {
      const node = props.data.nodes.find(n => n.id === d)
      if (node) {
        emit('nodeClick', node, event)
      }
    })
    .attr('cursor', 'pointer')
}

const animateLinks = (inner: any) => {
  const links = inner.selectAll('.edgePath path')
    .style('opacity', 1)
    .attr('stroke-dasharray', function() {
      return this.getTotalLength() + ' ' + this.getTotalLength();
    })
    .attr('stroke-dashoffset', function() {
      return this.getTotalLength();
    });

  links.transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0);
}

onMounted(createGraph)
watch(() => props.data, createGraph, { deep: true })
</script>

<style scoped>
.node rect {
  stroke: #2c3e50;
  stroke-width: 2px;
  transition: all 0.3s ease;
}

.node:hover rect {
  filter: brightness(1.1);
  transform: scale(1.05);
}

.node text {
  font-size: 14px;
  font-weight: 500;
  fill: white;
}

.edgePath path {
  stroke: #95a5a6;
  stroke-width: 2px;
  transition: stroke 0.3s ease;
}

.edgePath:hover path {
  stroke: #3498db;
  stroke-width: 3px;
}

.arrowhead {
  fill: #95a5a6;
}
</style>

