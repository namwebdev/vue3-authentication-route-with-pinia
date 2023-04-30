<template>
  <div>
    <input type="text" v-model="username" />
    <button @click="handleLogin">Login</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const username = ref("");
const { login } = useAuthStore();

function handleLogin() {
  if (username.value) login(username.value);
}
</script>

<style scoped></style>
