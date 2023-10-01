<template>
  <div>
    Home
    <router-link to="/products">Products Page</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";

const { logout } = useAuthStore();
</script>

<style scoped></style>
