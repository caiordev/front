<template>
  <!-- tabela -->
  <div class="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
    <div class="max-h-96 w-full overflow-x-auto overflow-y-auto">
      <table
        class="w-full border-collapse bg-white text-left text-sm text-gray-500"
      >
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Nome
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Curso
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Matricula
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            class="hover:bg-gray-50"
            v-for="(item, index) in alunos"
            :key="index"
          >
            <td class="px-6 py-4">{{ item.NOME }}</td>
            <td class="px-6 py-4">{{ item.CURSO }}</td>
            <td class="px-6 py-4">{{ item.EMAIL }}</td>
            <td class="px-6 py-4">{{ item.MATRICULA }}</td>
            <td class="px-6 py-4">
              <div class="flex justify-end gap-4">
                <a
                  class="cursor-pointer hover:text-red-700"
                  @click="deleteAluno(item.ID)"
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
                  @click="openModal(item.ID)"
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

  <!-- modal -->
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
                class="w-full rounded-full border border-gray-300 bg-cinza bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
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
                >Senha:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="matricula"
                v-model="state.senha"
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
                class="w-full rounded-full border border-gray-300 bg-cinza bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
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
                >Email</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="email"
                id="email"
                v-model="state.email"
                placeholder=""
              />
            </div>
            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Matricula</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="email"
                id="email"
                v-model="state.matricula"
                placeholder=""
              />
            </div>

            <button
              class="w-full rounded-full bg-cinza bg-red-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-red-600"
              @click="updateAluno"
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
import { getAlunoApi, deleteAlunoApi, updateAlunoApi } from "../providers";
import { useMainStore } from "../stores";
import { storeToRefs } from "pinia";

interface State {
  nome: string;
  curso: string;
  senha?: number;
  email: string;
  matricula?: number;
  showModal: boolean;
}

export default {
  name: "TableAlunoVue",

  beforeMount() {
    this.getAlunos();
  },

  setup() {
    const mainStore = useMainStore();
    const { alunos } = storeToRefs(mainStore);

    const state = reactive<State>({
      nome: "",
      curso: "",
      senha: undefined,
      email: "",
      matricula: undefined,
      showModal: false,
    });

    const idAluno = ref("");

    const openModal = (id: string) => {
      idAluno.value = id;
      state.showModal = true;
    };

    const closeModal = () => {
      state.showModal = false;
    };

    const getAlunos = async () => {
      const alunos = await getAlunoApi();
      mainStore.setAlunos(alunos);
    };

    const deleteAluno = async (id: string) => {
      await deleteAlunoApi(id);
      getAlunos();
    };

    const updateAluno = async () => {
      await updateAlunoApi({
        ID: idAluno.value,
        NOME: state.nome,
        CURSO: state.curso,
        EMAIL: state.email,
        SENHA: state.senha,
        MATRICULA: state.matricula,
      });

      getAlunos();
      closeModal();
    };

    return {
      alunos,
      openModal,
      closeModal,
      idAluno,
      state,
      deleteAluno,
      updateAluno,
      getAlunos,
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
