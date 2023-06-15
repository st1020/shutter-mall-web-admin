import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("@/views/StatisticsView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/UserView.vue"),
    },
    {
      path: "/user/edit/:id",
      name: "edit-user",
      component: () => import("@/views/UserEditView.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () => import("@/views/ProductView.vue"),
    },
    {
      path: "/product/add",
      name: "add-product",
      component: () => import("@/views/ProductAddView.vue"),
    },
    {
      path: "/product/edit/:id",
      name: "edit-product",
      component: () => import("@/views/ProductEditView.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/OrderView.vue"),
    },
    {
      path: "/order/edit/:id",
      name: "edit-order",
      component: () => import("@/views/OrderEditView.vue"),
    },
  ],
});

export default router;
