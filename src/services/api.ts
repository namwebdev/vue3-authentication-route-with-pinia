import { admin, user, role } from "../store/auth";

export const login = (username: string) => {
  if (username === admin)
    return {
      token: admin,
    };
  if (username === user) return { token: user };
  throw new Error("401");
};

export const getInfo = (_token?: string) => {
  const token = _token || localStorage.getItem("token");
  if (!token) throw new Error("401");

  if (token === admin) {
    localStorage.setItem("token", token);
    return {
      role: role.admin,
    };
  }
  if (token === user) {
    localStorage.setItem("token", token);
    return {
      role: role.user,
    };
  }

  throw new Error("401");
};
