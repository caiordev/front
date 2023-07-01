<template>
  <!-- modal -->
  <div>
    <a
      class="itens-center flex w-full cursor-pointer justify-center text-sm text-white transition duration-300 hover:text-red-600"
      @click="setModal(true)"
    >
      {{ nomeBotao }}
    </a>
    <div v-if="state.showModal" class="modal">
      <div
        class="m-16 mx-auto w-full max-w-sm rounded-md bg-branco p-10 p-8 shadow-md"
      >
        <span class="close" @click="setModal(false)">&times;</span>
        <slot>
          <div class="mb-4">
            <div class="mb-4">
              <label
                class="text-red mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Nome Completo:</label
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
                class="text-red mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Senha:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="password"
                id="matricula"
                v-model="state.senha"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="text-red mb-2 block text-sm font-bold text-gray-700"
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
                class="text-red mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Email:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="email"
                id="email"
                v-model="state.email"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="text-red mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Matricula:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="matricula"
                v-model="state.matricula"
                placeholder=""
              />
            </div>

            <button
              style="background-color: #ff4d4d"
              class="w-full rounded-full px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-red-700"
              @click="insertAluno()"
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
import { postAlunoApi, getAlunoApi } from "../providers";
import { useMainStore } from "../stores";

interface State {
  nome: string;
  curso: string;
  senha?: number;
  email: string;
  matricula?: number;
  showModal: boolean;
}

export default {
  name: "PostAlunoModal",
  props: ["nomeBotao"],

  setup() {
    const mainStore = useMainStore();

    const state = reactive<State>({
      nome: "",
      curso: "",
      senha: undefined,
      email: "",
      matricula: undefined,
      showModal: false,
    });

    const setModal = (isOpen: boolean) => {
      state.nome = "";
      state.curso = "";
      state.senha = undefined;
      state.email = "";
      state.matricula = undefined;

      state.showModal = isOpen;
    };

    const insertAluno = async () => {
      // insere um novo aluno
      await postAlunoApi({
        ID: "",
        NOME: state.nome,
        CURSO: state.curso,
        EMAIL: state.email,
        SENHA: state.senha,
        MATRICULA: state.matricula,
      });

      const alunos = await getAlunoApi();

      mainStore.setAlunos(alunos);
      // criar um setAlunos

      setModal(false);
    };

    return {
      insertAluno,
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
