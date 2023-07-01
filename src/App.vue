<template>
  <div class="m-5 overflow-hidden rounded-lg">
    <div v-if="user?.TIPO === 1" class="border-b border-b-gray-200">
      <button
        @click="authStore.logout"
        class="absolute right-0 top-0 mr-4 mt-4 flex items-center space-x-2 rounded bg-red-500 px-4 py-2 text-white"
      >
        <span>Sair</span>
      </button>
      <ul
        class="-mb-px flex flex-wrap items-center gap-4 text-sm font-medium md:flex-nowrap"
      >
        <RouterLink to="/professor">
          <li class="flex-1">
            <a
              class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-red-700"
              :class="{ 'text-red-700': selectedTab === 'professor' }"
              @click="selectedTab = 'professor'"
            >
              Professor
            </a>
          </li>
        </RouterLink>

        <RouterLink to="/aluno">
          <li class="flex-1">
            <a
              class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-red-700"
              :class="{ 'text-red-700': selectedTab === 'aluno' }"
              @click="selectedTab = 'aluno'"
            >
              Aluno
            </a>
          </li>
        </RouterLink>

        <RouterLink to="/disciplina">
          <li class="flex-1">
            <a
              class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-red-700"
              :class="{ 'text-red-700': selectedTab === 'disciplina' }"
              @click="selectedTab = 'disciplina'"
            >
              Disciplina
            </a>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>

  <RouterView />
</template>

<script lang="ts">
import { ref } from "vue";

import { useAuthStore } from "./stores";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const authStore = useAuthStore();

    const { user } = storeToRefs(authStore);

    const selectedTab = ref("");

    return {
      selectedTab,
      user,
      authStore,
    };
  },
};
</script>

<style scoped></style>
