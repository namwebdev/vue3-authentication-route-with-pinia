import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Products from "./views/Product/Index.vue";
import CreateProduct from "./views/Product/Create.vue";
import NotFound from "./views/NotFound.vue";
import { useAuthStore } from "./store/auth";

export const RouteName = {
  Login: "Login",
  SignUp: "SignUp",
  Home: "Home",
  Admin: "Admin",
} as const;

const routes = [
  { path: "/", component: Home, name: RouteName.Home },
  { path: "/login", component: Login, name: RouteName.Login },
  { path: "/sign-up", component: SignUp, name: RouteName.SignUp },
  {
    path: "/products",
    component: Products,
    name: "Products",
    meta: { requireAuth: true },
    children: [
      { path: "create", component: CreateProduct, name: "CreateProduct" },
    ],
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

function isAuthPage(page: string) {
  const authPageNames = [RouteName.Login, RouteName.SignUp] as string[];
  if (authPageNames.includes(page)) return true;
  return false;
}

router.beforeEach(async (to, from, next) => {
  if (!useAuthStore().user) await useAuthStore().getInfo();

  if (!to.meta.requireAuth && !isAuthPage(to.name as string)) return next();

  const { user } = useAuthStore();
  // const isAdminUser = false;

  if (isAuthPage(to.name as string)) {
    if (!user) return next();
    // if (isAdminUser) return next({ name: RouteName.Admin });
    return next({ name: RouteName.Home });
  }

  // if (to.meta.isAdmin) {
  //   if (isAdminUser) return next();
  //   return next({ name: RouteName.Home });
  // }

  if (user) return next();

  next({
    name: RouteName.Login,
    query: {
      redirect: to.fullPath,
    },
  });
});

export default router;
