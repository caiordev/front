<template>
  <div
    class="relative col-span-1 m-auto h-[45vh] w-full overflow-scroll rounded-lg rounded-md bg-white shadow-md lg:h-[60vh]"
  >
    <table
      class="w-full border-collapse bg-white text-left text-sm text-gray-500"
    >
      <caption class="bg-gray-50 p-4 text-center text-lg text-gray-500">
        Turmas
      </caption>
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">
            Docente
          </th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Vagas</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          class="hover:bg-gray-50"
          v-for="(item, index) in disciplinasComNomeDoProfessor"
          :key="index"
        >
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">{{ item.NOME_PROFESSOR }}</td>
          <td class="px-6 py-4">{{ item.VAGAS }}</td>
        </tr>
      </tbody>
    </table>

    <div class="p-4"></div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "../stores"; // usados para acesssar os dados da store e torná-los reativos.
import { storeToRefs } from "pinia";

export default {
  name: "DisciplinasDoUsuario",

  setup() {
    //usado para configurar o estado do componete e definri os métodos e variáveis disponíveis para uso no template.
    const mainStore = useMainStore(); //obter a instancia do store principal.
    const { disciplinasUser, professores } = storeToRefs(mainStore); //obtidos os valores reativos do store principal.

    const disciplinasComNomeDoProfessor = computed(() => {
      //mapeia as disciplinas do usuario e adiciona o nome do professor a cada disciplina do usuario.
      return disciplinasUser.value.map((item) => {
        if (item.ID_PROFESSOR && professores.value) {
          const professor = professores.value.find(
            (prof) => prof.ID === item.ID_PROFESSOR
          );
          if (professor) {
            return {
              ...item,
              NOME_PROFESSOR: professor.NOME, //para buscar o nome pelo  id.
            };
          }
        }
        return item;
      });
    });

    return {
      disciplinasComNomeDoProfessor,
      mainStore,
    };
  },
};
</script>

<style scoped></style>
