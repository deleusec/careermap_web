<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="app-name">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
      <p>CareerMap</p>
    </div>
    <div class="connection">
      <button>S'inscrire</button>
      <button>Se connecter</button>
    </div>
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
}

.app-name {
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-size: 1rem;
    font-weight: bold;
  }
}

.connection {
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #131112;
    color: #F7F7FF;
    padding: 0.5rem 1.5rem;
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
