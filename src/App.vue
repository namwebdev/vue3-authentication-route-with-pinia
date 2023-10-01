<template>
  <div v-if="loading">Loading...</div>

  <div v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useAuthStore } from "./store/auth";

const loading = ref(false);

// init();

// async function init() {
//   await useAuthStore().getInfo();
//   loading.value = false;
// }
</script>

<style scoped></style>
