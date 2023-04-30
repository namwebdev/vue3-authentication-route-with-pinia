import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Products from "./views/Product/Index.vue";
import Admin from "./views/Admin.vue";
import NotFound from "./views/NotFound.vue";
import { role, useAuthStore } from "./store/auth";

export const RouteName = {
  Login: "Login",
  Home: "Home",
  Admin: "Admin",
} as const;

const routes = [
  { path: "/", component: Home, name: RouteName.Home },
  { path: "/login", component: Login, name: RouteName.Login },
  {
    path: "/products",
    component: Products,
    name: "Products",
    meta: { requireAuth: true },
  },
  {
    path: "/admin",
    component: Admin,
    name: RouteName.Admin,
    meta: { requireAuth: true, isAdmin: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth && to.name !== RouteName.Login) return next();

  const { user } = useAuthStore();
  const isAdminUser = user?.role === role.admin;

  if (to.name === RouteName.Login) {
    if (!user) return next();
    if (isAdminUser) return next({ name: RouteName.Admin });
    return next({ name: RouteName.Home });
  }

  if (to.meta.isAdmin) {
    if (isAdminUser) return next();
    return next({ name: RouteName.Home });
  }

  if (user) return next();

  next({
    name: RouteName.Login,
    query: {
      redirect: to.fullPath,
    },
  });
});

export default router;
