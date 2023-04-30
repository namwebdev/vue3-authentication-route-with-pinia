import { defineStore } from "pinia";
import { getInfo, login } from "../services/api";
import { RouteName } from "../router";

export const admin = "1";
export const user = "2";

export const role = {
  admin: "admin",
  user: "user",
} as const;

interface User {
  role: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    login(username: string) {
      try {
        const { token } = login(username);
        this.user = getInfo(token);

        if (this.user.role === role.admin)
          return this.router.push({ name: RouteName.Admin });

        let route = "/products";
        if (getRedirectRoute()) route = getRedirectRoute() as string;
        this.router.push(route);
      } catch (e) {
        alert("Login failed!");
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("token");
      this.router.push({ name: RouteName.Login });
    },
    setUser(user: User) {
      if (user?.role) this.user = user;
    },
  },
});

const getRedirectRoute = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("redirect");
};
