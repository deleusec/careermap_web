<script setup lang="ts">
import * as d3 from 'd3'
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const data = ref({
  name: 'Honey',
  children: [
    { name: 'Lucy' },
    {
      name: 'Tom',
      children: [{ name: 'Tony' }, { name: 'Ben' }],
    },
  ],
})

const treeContainer = ref(null)

onMounted(() => {
  createTree()
})
const createTree = () => {
  // Configuration
  const width = 400
  const height = 600

  const svg = d3
    .select(treeContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g').attr('transform', 'translate(50,50)')

  // Crée un layout tree avec D3
  const tree = d3.tree().size([width - 100, height - 200]) // Dimensions inversées pour un arbre vertical
  const root : any = d3.hierarchy(data.value)
  tree(root)

  // Ajout des liens courbes (Vertical)
  const links = g
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      d3.linkVertical()
        .x((d: any) => d.x) // Les coordonnées X et Y sont inversées pour l'orientation verticale
        .y((d: any) => d.y) as any
    )
    .attr('stroke', '#aaa')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('stroke-dasharray', function () {
      const length = this.getTotalLength()
      return `${length} ${length}`
    })
    .attr('stroke-dashoffset', function () {
      return this.getTotalLength()
    })

  // Ajout des nœuds avec des boîtes rectangulaires
  const nodes = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`) // Inversé pour correspondre à l'orientation verticale
    .style('opacity', 0)
    .on('click', (event, d) => handleNodeClick(d)) // Gérer l'événement au clic

  nodes
    .append('rect')
    .attr('width', 80)
    .attr('height', 30)
    .attr('x', -40)
    .attr('y', -15)
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('fill', '#3498db')

  nodes
    .append('text')
    .attr('dy', 4)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .text((d) => d.data.name)

  // Animation
  links.each(function (d, i) {
    gsap.to(this, {
      strokeDashoffset: 0,
      duration: 1,
      delay: i * 0.5,
    })
  })

  nodes.each(function (d, i) {
    gsap.to(this, {
      opacity: 1,
      duration: 0.5,
      delay: i * 0.5,
    })
  })
}
const handleNodeClick = (node: any) => {
  alert(`Noeud cliqué : ${node.data.name}`)
}
</script>

<template>
  <div id="tree-container" ref="treeContainer"></div>
</template>

<style>
#tree-container svg {
  background-color: #f9f9f9;
}

.node rect {
  stroke: #2c3e50;
  stroke-width: 2px;
}

.link {
  stroke: #aaa;
  fill: none;
}
</style>
