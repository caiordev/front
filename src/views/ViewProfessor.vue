<script setup lang="ts">
import TableProfessorVue from "@components/TableProfessor.vue";
import PostProfessorModalVue from "@/components/PostProfessorModal.vue";
</script>

<template>
  <TableProfessorVue />
  <PostProfessorModalVue
    class="border-3 m-5 block flex w-32 items-center justify-center rounded-full border-red-600 px-4 py-2 shadow-md"
    nome-botao="Adicionar"
  />
</template>

<style scoped></style>
