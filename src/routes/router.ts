import * as vueRouter from "vue-router";
import ViewProfessorVue from "../views/ViewProfessor.vue";
import ViewInforUser from "../views/viewInforUser.vue";
import ViewLoginVue from "../views/ViewLoginVue.vue";
import ViewAluno from "../views/ViewAluno.vue";
import ViewDisciplina from "../views/ViewDisciplina.vue";

import { useAuthStore } from "../stores";
import { storeToRefs } from "pinia";

const _routes: Array<vueRouter.RouteRecordRaw> = [
  {
    path: "/",
    component: ViewInforUser,
    name: "inforUser",
    meta: {
      auth: true,
    },
  },
  {
    path: "/aluno",
    component: ViewAluno,
    name: "aluno",
    meta: {
      auth: true,
    },
  },
  {
    path: "/professor",
    component: ViewProfessorVue,
    name: "professor",
    meta: {
      auth: true,
    },
  },
  {
    path: "/disciplina",
    component: ViewDisciplina,
    name: "disciplina",
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    component: ViewLoginVue,
    name: "login",
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: _routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { token, user } = storeToRefs(authStore);

  if (to.meta?.auth) {
    if (token.value && user.value) {
      try {
        const isAuthenticated = await authStore.checkToken();
        console.log("verify: ", isAuthenticated);
        if (isAuthenticated.authenticated) {
          if (user.value.TIPO !== 1 && to.name !== "inforUser") {
            next({ name: "inforUser" });
          } else {
            next();
          }
        }
      } catch (error) {
        console.error(error);
        next("/login");
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
