<template>
  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";

const { logout } = useAuthStore();
</script>

<style scoped></style>
