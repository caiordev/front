<template>
  <!-- modal -->
  <div>
    <a
      class="flex w-full cursor-pointer items-center justify-center text-sm text-white transition duration-300 hover:text-red-600"
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
                class="mb-2 block text-sm font-bold text-gray-700"
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
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Email:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="curso"
                v-model="state.email"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Siaep:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="email"
                v-model="state.siaep"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Departamento:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="email"
                v-model="state.departamento"
                placeholder=""
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Celular:</label
              >
              <input
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="matricula"
                v-model="state.numero"
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
                class="w-full rounded-full border border-gray-300 bg-cinza px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="password"
                id="matricula"
                v-model="state.senha"
                placeholder=""
              />
            </div>

            <button
              style="background-color: #ff4d4d"
              class="w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600"
              @click="insertProfessor()"
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
import { postProfessorApi, getProfessorApi } from "../providers";
import { useMainStore } from "../stores";

interface State {
  nome: string;
  email: string;
  senha: string;
  numero?: number;
  siaep?: number;
  departamento: string;
  showModal: boolean;
}

export default {
  name: "PostProfessorModal",
  props: ["nomeBotao"],

  setup() {
    const mainStore = useMainStore();

    const state = reactive<State>({
      nome: "",
      email: "",
      senha: "",
      departamento: "",
      numero: undefined,
      siaep: undefined,
      showModal: false,
    });

    const setModal = (isOpen: boolean) => {
      state.nome = "";
      state.email = "";
      state.senha = "";
      state.departamento = "";
      state.numero = undefined;
      state.siaep = undefined;

      state.showModal = isOpen;
    };

    const insertProfessor = async () => {
      // insere um novo aluno
      await postProfessorApi({
        ID: "",
        NOME: state.nome,
        DEPARTAMENTO: state.departamento,
        EMAIL: state.email,
        SENHA: state.senha,
        NUMERO: state.numero,
        SIAEP: state.siaep,
      });

      const professores = await getProfessorApi();

      mainStore.setProfessores(professores);
      // criar um setAlunos

      setModal(false);
    };

    return {
      insertProfessor,
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
