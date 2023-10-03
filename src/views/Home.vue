<template>
  <div>
    Home
    <router-link to="/products">Products Page</router-link>
    <button @click="logout">Logout</button>
  </div>

  <div>
    <div v-if="loading">Loading</div>
    <div v-else>
      <div v-for="article in articles?.data.articles">
        {{ article.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "../services";
import { useAuthStore } from "../store/auth";
import { _useAsync } from "../utils/useAsync";

const { logout } = useAuthStore();

const {
  result: articles,
  isLoading: loading,
  execute,
} = _useAsync(() => api.articles.getAll());

(async function () {
  await execute();
})();
</script>

<style scoped></style>
