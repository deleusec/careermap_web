<template>
  <div id="app">
    <Tree />
  </div>
</template>

<script>
import Tree from '@/components/tree.vue';

export default {
  components: {
    Tree
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
