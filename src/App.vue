<template>
  <main>
    <NavBar />

    <RouterView />
  </main>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import NavBar from './components/nav/NavBar.vue';
</script>
