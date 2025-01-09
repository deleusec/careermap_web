<script setup lang="ts">
import * as d3 from 'd3'
import * as dagreD3 from 'dagre-d3'
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'

interface GraphNode {
  id: string
  label: string
  color?: string
}

interface GraphLink {
  source: string
  target: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

const props = defineProps<{
  data: GraphData
  nodeWidth?: number
  nodeHeight?: number
}>()

const emit = defineEmits<{
  (e: 'nodeClick', node: GraphNode): void
}>()

const graphContainer = ref<HTMLElement | null>(null)

const createGraph = () => {
  // Nettoyer le conteneur
  d3.select(graphContainer.value).selectAll('*').remove();

  // Créer un nouveau graphe
  const g = new dagreD3.graphlib.Graph().setGraph({});

  g.setGraph({
    rankdir: 'TB', // Orientation du graphe : Top-Bottom
    align: 'UL',
    nodesep: 50, // Espacement entre les nœuds
    ranksep: 70, // Espacement entre les niveaux
    marginx: 20,
    marginy: 20,
  });

  // Ajouter les nœuds
  props.data.nodes.forEach(node => {
    g.setNode(node.id, {
      label: node.label,
      style: `fill: ${node.color || '#3498db'}`,
      rx: 5,
      ry: 5,
      width: props.nodeWidth || 100,
      height: props.nodeHeight || 40,
    });
  });

  // Ajouter les liens
  props.data.links.forEach(link => {
    g.setEdge(link.source, link.target, {
      style: 'stroke: #3498db; stroke-width: 2px; fill: none;',
      arrowheadStyle: 'fill: #3498db;',
    });
  });

  // Créer le SVG
  const svg = d3
    .select(graphContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '1000px');

  const inner = svg.append('g');

  // Initialiser le renderer
  const render = new dagreD3.render();

  // Rendre le graphe
  render(inner, g);

  // Centrer le graphe
  const graphWidth = g.graph().width || 0;
  const graphHeight = g.graph().height || 0;
  const containerWidth = graphContainer.value?.clientWidth || 0;
  const containerHeight = graphContainer.value?.clientHeight || 0;

  const xOffset = (containerWidth - graphWidth) / 2;
  const yOffset = (containerHeight - graphHeight) / 2;

  inner.attr('transform', `translate(${xOffset}, ${yOffset})`);

  // Ajouter les animations sur les liens
  animateLinks(inner);
};


// Animation des liens
const animateLinks = (inner: any) => {
  const links = inner.selectAll('.edgePath path');

  links.each(function () {
    const link = d3.select(this);
    const totalLength = this.getTotalLength();

    link.attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength);

    d3.select(this)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
  });
};


onMounted(() => {
  createGraph()
})

watch(() => props.data, createGraph, { deep: true })
</script>

<template>
  <div ref="graphContainer" class="w-full h-full min-h-[600px]"></div>
</template>

<style scoped>
.node rect {
  stroke: #2c3e50;
  stroke-width: 2px;
  transition: transform 0.2s ease;
}

.node:hover rect {
  transform: scale(1.05);
}

.edgePath path {
  stroke: #3498db;
  stroke-width: 2px;
  fill: none;
}


.arrowhead {
  fill: #3498db;
}
</style>

