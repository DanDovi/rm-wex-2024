// hook and provider for authentication
// Checks if a token is present in local storage and sets the user state accordingly

import { createContext, useContext } from "react";

interface IAuthContext {
  user: { username?: string };
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  createpost: (title: string, body: string) => void;
  createtopic: (title: string, desc: string) => void;
  logout: () => void;
}

export const getUserFromStorage = () => {
  const storedUser = localStorage.getItem("token");

  if (!storedUser) {
    return {};
  }

  const { username } = JSON.parse(storedUser);

  if (!username) {
    localStorage.removeItem("token");
    return {};
  }

  return { username };
};

export const authContext = createContext<IAuthContext>({
  user: getUserFromStorage(),
  login: async () => {},
  register: async () => {},
  logout: () => {},
  createpost: () => {},
  createtopic: () => {},
});

export const useAuth = () => {
  return useContext(authContext);
};
