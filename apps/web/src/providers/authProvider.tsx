import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginUser, register as registerUser } from "../api/auth";
import { authContext, getUserFromStorage } from "../hooks/useAuth";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<{ username?: string }>(getUserFromStorage());

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const { username: resUserName, accessToken } = await loginUser(
      username,
      password,
    );
    const storedUser = JSON.stringify({ username: resUserName, accessToken });
    localStorage.setItem("token", storedUser);
    setUser({ username: resUserName });
    navigate("/app/dashboard");
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  const register = async (username: string, password: string) => {
    const { username: resUserName, accessToken } = await registerUser(
      username,
      password,
    );
    const storedUser = JSON.stringify({ username: resUserName, accessToken });
    localStorage.setItem("token", storedUser);
    setUser({ username: resUserName });
    navigate("/app/dashboard");
  };

  // Return the provider with the user state and login and logout functions
  return (
    <authContext.Provider value={{ user, login, logout, register }}>
      {children}
    </authContext.Provider>
  );
};
