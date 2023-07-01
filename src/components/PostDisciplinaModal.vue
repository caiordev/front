<template>
  <!-- modal -->
  <div>
    <a
      class="flex w-full cursor-pointer items-center justify-center text-sm text-blue-500 transition duration-300 hover:text-blue-600"
      @click="setModal(true)"
      >{{ nomeBotao }}</a
    >
    <div v-if="state.showModal" class="modal">
      <div
        class="m-16 mx-auto w-full max-w-sm rounded-md bg-branco p-10 p-8 shadow-md"
      >
        <span class="close" @click="setModal(false)">&times;</span>
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
                >Curso:</label
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
              style="background-color: #ff4d4d"
              class="w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600"
              @click="insertDisciplina()"
            >
              Adicionar
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { postDisciplinaApi, getDisciplinaApi } from "../providers";
import { useMainStore } from "../stores";

interface State {
  nome: string;
  curso: string;
  horario: string;
  codigo: string;
  showModal: boolean;
}

export default {
  name: "PostDisciplinaModal",
  props: ["nomeBotao"],

  setup() {
    const mainStore = useMainStore();

    const state = reactive<State>({
      nome: "",
      curso: "",
      horario: "",
      codigo: "",
      showModal: false,
    });

    const setModal = (isOpen: boolean) => {
      state.nome = "";
      state.curso = "";
      state.horario = "";
      state.codigo = "";

      state.showModal = isOpen;
    };

    const insertDisciplina = async () => {
      // insere um novo aluno
      await postDisciplinaApi({
        ID: "",
        NOME: state.nome,
        CURSO: state.curso,
        HORARIO: state.horario,
        COD_DISCIPLINA: state.codigo,
      });

      const desciplinas = await getDisciplinaApi();

      mainStore.setDisciplinas(desciplinas);
      // criar um setAlunos

      setModal(false);
    };

    return {
      insertDisciplina,
      setModal,
      state,
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
</style>
