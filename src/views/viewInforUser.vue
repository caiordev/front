<template>
  <button
    @click="authStore.logout"
    class="absolute right-0 top-0 mr-4 mt-4 flex items-center space-x-2 rounded bg-red-500 px-4 py-2 text-white"
  >
    <span>Sair</span>
  </button>
  <div class="max-h-screen overflow-y-auto">
    <div
      v-if="user?.TIPO === 3"
      class="grid grid-cols-1 gap-2 p-4 lg:grid-cols-3"
    >
      <InforAluno />
      <Matricula />
      <DisciplinasDoUsuario class="text-sm" />
    </div>

    <div
      v-if="user?.TIPO === 2"
      class="grid grid-cols-1 gap-2 p-4 lg:grid-cols-3"
    >
      <InforProfessor />
      <DisciplinasDisponiveis />
      <DisciplinasDoUsuario class="text-sm" />
    </div>
  </div>
</template>

<script lang="ts">
import InforAluno from "@components/InforAluno.vue";
import InforProfessor from "@components/InforProfessor.vue";
import Matricula from "@components/Matricula.vue";
import DisciplinasDoUsuario from "@components/DisciplinasDoUsuario.vue";
import DisciplinasDisponiveis from "@components/DisciplinasDisponiveis.vue";

import { useAuthStore } from "../stores";
import { storeToRefs } from "pinia";

export default {
  components: {
    InforAluno,
    InforProfessor,
    Matricula,
    DisciplinasDoUsuario,
    DisciplinasDisponiveis,
  },

  setup() {
    const authStore = useAuthStore();

    const { user } = storeToRefs(authStore);

    return {
      user,
      authStore,
    };
  },
};
</script>

<style scoped></style>
