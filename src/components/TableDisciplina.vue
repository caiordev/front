<template>
  <!-- component -->
  <div class="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
    <div class="max-h-96 w-full overflow-x-auto overflow-y-auto">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            horario
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Código
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Vagas</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          class="hover:bg-gray-50"
          v-for="(item, index) in disciplinas"
          :key="index"
        >
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">{{ item.HORARIO }}</td>
          <td class="px-6 py-4">{{ item.COD_DISCIPLINA }}</td>
          <td class="px-6 py-4">{{ item.VAGAS }}</td>

          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a
                class="cursor-pointer hover:text-red-700"
                x-data="{ tooltip: 'Delete' }"
                @click="deleteDisciplina(item.ID)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </a>
              <a
                class="cursor-pointer hover:text-red-700"
                x-data="{ tooltip: 'Edite' }"
                @click="openModal(item.ID)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>

  <div>
    <div v-if="state.showModal" class="modal">
      <div
        class="m-16 mx-auto w-full max-w-sm rounded-md bg-branco p-10 p-8 shadow-md"
      >
        <span class="close" @click="closeModal">&times;</span>
        <slot>
          <div class="mb-4">
            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Nome:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="name"
                name="name"
                v-model="state.nome"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Curso</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="curso"
                v-model="state.curso"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Horário:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="horario"
                v-model="state.horario"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Código:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="codigo"
                v-model="state.codigo"
                placeholder=""
              />
            </div>

            <button
              class="w-full rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-red-600"
              @click="updateDisciplina()"
            >
              Atualizar
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import {
  getDisciplinaApi,
  deleteDisciplinaApi,
  updateDisciplinaApi,
} from "../providers";
import { useMainStore } from "../stores";
import { storeToRefs } from "pinia";

interface State {
  nome: string;
  curso: string;
  horario: string;
  codigo: string;
  showModal: boolean;
}

export default {
  name: "TableDisciplinaVue",

  beforeMount() {
    this.getDisicplinas();
  },

  setup() {
    const mainStore = useMainStore();
    const { disciplinas } = storeToRefs(mainStore);

    const state = reactive<State>({
      nome: "",
      curso: "",
      horario: "",
      codigo: "",
      showModal: false,
    });

    const idDisciplina = ref("");

    const openModal = (id: string) => {
      idDisciplina.value = id;
      state.showModal = true;
    };

    const closeModal = () => {
      state.showModal = false;
    };

    const getDisicplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

    const deleteDisciplina = async (id: string) => {
      await deleteDisciplinaApi(id);
      getDisicplinas();
    };

    const updateDisciplina = async () => {
      console.log("state", state);
      await updateDisciplinaApi({
        ID: idDisciplina.value,
        NOME: state.nome,
        CURSO: state.curso,
        HORARIO: state.horario,
        COD_DISCIPLINA: state.codigo,
      });
      getDisicplinas();
      closeModal();
    };

    return {
      disciplinas,
      closeModal,
      idDisciplina,
      state,
      deleteDisciplina,
      getDisicplinas,
      updateDisciplina,
      openModal,
    };
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 640px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  td {
    position: relative;

    &::before {
      content: attr(data-label);
      position: absolute;
      top: 0;
      left: 0;
      width: 40%;
      padding-right: 10px;
      font-weight: bold;
      text-align: right;
    }
  }
}
.table {
  td {
    position: relative;

    &::before {
      content: attr(data-label);
      position: absolute;
      top: 0;
      left: 0;
      width: 40%;
      padding-right: 10px;
      font-weight: bold;
      text-align: right;
    }
  }
}

.overflow-x-auto {
  max-width: 100%;
  overflow-x: auto;
}

.overflow-y-auto {
  max-height: 100%;
  overflow-y: auto;
}

.max-h-96 {
  max-height: 24rem; /* Ajuste a altura máxima conforme necessário */
}
</style>
