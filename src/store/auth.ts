import { defineStore } from "pinia";
import { RouteName } from "../router";
import { api } from "../services";
import { User } from "../types/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async login(username: string, password: string) {
      const { data, error } = await api.auth.login(username, password);
      if (error) {
        const errorResponse = {
          ok: false,
          statusCode: error.statusCode,
        };
        if (error.statusCode === 403)
          return {
            ...errorResponse,
            message: "Email or password is invalid!",
          };

        return {
          ...errorResponse,
          message: "Something went wrong!",
        };
      }
      console.log();
      this.setUser(data.user);

      let route = "/";
      if (getRedirectRoute()) route = getRedirectRoute() as string;
      this.router.push(route);

      return { ok: true, message: "OK" };
    },
    async getInfo() {
      const token = api.auth.getToken();
      if (!token) {
        console.warn("Empty token!");
        return;
      }

      const { data: user } = await api.user.getInfo();
      this.setUser(user);
    },
    setUser(user: User) {
      if (!user) return;

      this.user = user;
      api.auth.setToken(user.token);
    },
    logout() {
      this.user = null;
      api.auth.removeToken();
      this.router.push({ name: RouteName.Login });
    },
  },
});

const getRedirectRoute = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("redirect");
};
