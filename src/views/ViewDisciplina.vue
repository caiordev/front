<script setup lang="ts">
import TableDisciplinaVue from "@components/TableDisciplina.vue";

import PostDisciplinaModalVue from "@/components/PostDisciplinaModal.vue";
</script>

<template>
  <TableDisciplinaVue />
  <PostDisciplinaModalVue
    class="border-3 m-5 block flex w-32 items-center justify-center rounded-full border-blue-600 px-4 py-2 shadow-md"
    nome-botao="Adicionar"
  />
</template>

<style scoped></style>
