<template>
  <div>
    <input type="text" v-model="form.username" />
    <input type="text" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button @click="handleLogin" :disabled="form.loading">
      <span v-if="form.loading">Loading</span>
      <span v-else>Sign Up</span>
    </button>
    <div v-show="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/auth";

const form = reactive({
  email: "",
  username: "",
  password: "",
  loading: false,
});
const error = ref("");

const { login } = useAuthStore();

async function handleLogin() {
  form.loading = true;
  error.value = "";

  const res = await login(form.username, form.password);
  if (!res.ok) {
    error.value = res.message;
  }
  form.loading = false;
}
</script>

<style scoped></style>
