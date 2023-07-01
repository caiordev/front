<template>
  <div
    class="relative col-span-1 m-auto h-[45vh] w-full overflow-scroll rounded-lg rounded-md bg-white shadow-md lg:h-[60vh]"
  >
    <table
      class="w-full border-collapse bg-white text-left text-sm text-gray-500"
    >
      <caption class="bg-gray-50 p-4 text-center text-lg text-gray-500">
        Disciplinas Sem Professor
      </caption>
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          class="hover:bg-gray-50"
          v-for="(item, index) in state.disciplinasNaoMatriculadas"
          :key="index"
        >
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a
                class="cursor-pointer"
                @click="vincularProfessorDisciplina(item.ID)"
              >
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <g id="Complete">
                      <g data-name="add" id="add-2">
                        <g>
                          <line
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            x1="12"
                            x2="12"
                            y1="19"
                            y2="5"
                          ></line>
                          <line
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            x1="5"
                            x2="19"
                            y1="12"
                            y2="12"
                          ></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "../stores"; // usado para se obter uma instancia da store principal.
import { storeToRefs } from "pinia"; //para gerenciar o estado da aplicação.
import { vincularProfessor, getDisciplinaApi } from "../providers"; // Provedor da api para obter e salvar.
import { IDisciplina } from "../Interfaces/IDisciplina";

interface State {
  // definida para representar o estado do componente.
  disciplinasNaoMatriculadas: IDisciplina[];
  disciplinasProfessor: IDisciplina[];
}

export default {
  name: "DisciplinasDisponiveis",

  async beforeMount() {
    //para ser executado antes do componente ser montado.
    await this.getDisciplinas();
    await this.setaDisciplinasSemProfessor();
  },

  setup() {
    //configurar o estado do componente e definir os métodos e variáveis
    //disponíveis para uso no template.

    const mainStore = useMainStore();

    const { disciplinas, userProfessor } = storeToRefs(mainStore);

    const state = reactive<State>({
      //torna o objeto reativo para ser atualizado no html.
      disciplinasNaoMatriculadas: [],
      disciplinasProfessor: [],
    });

    // busca todas as disciplinas cadastrados no banco por meio da api
    //guarda a resposta e atualiza o estado global da aplicação.
    const getDisciplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

    const vincularProfessorDisciplina = async (idDisciplina: string) => {
      // adiciona ao banco uma linha com o id do usuario logado e o id da disciplina ao clicar.
      await vincularProfessor(idDisciplina, userProfessor.value.ID);

      console.log(idDisciplina);
      console.log(userProfessor.value.ID);

      setaDisciplinasSemProfessor(); //atualizar a lista de disciplinas sem professor e a lista de disciplinas associadas ao professor logado.
    };

    const setaDisciplinasSemProfessor = async () => {
      await getDisciplinas();
      state.disciplinasNaoMatriculadas = disciplinas.value.filter(
        (disciplina) => disciplina.ID_PROFESSOR === null
      );
      state.disciplinasProfessor = disciplinas.value.filter(
        (disciplina) => disciplina.ID_PROFESSOR === userProfessor.value.ID
      );

      mainStore.setDisciplinasUser(state.disciplinasProfessor); // atualizaa o estado global da aplicação.
    };

    return {
      disciplinas,
      getDisciplinas,
      mainStore,
      vincularProfessorDisciplina,
      state,
      setaDisciplinasSemProfessor,
    };
  },
};
</script>

<style scoped></style>
