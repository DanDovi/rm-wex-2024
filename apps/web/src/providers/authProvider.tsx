import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginUser, register as registerUser } from "../api/auth";
import { authContext, getUserFromStorage } from "../hooks/useAuth";
import { IUserDetails, storeUserDetails } from "../utils/authToken";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<{ username?: string, userId?: string }>(getUserFromStorage());

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const { username: resUserName, accessToken, userId } = await loginUser(
      username,
      password,
    );

    const userDetails: IUserDetails = { username: resUserName, accessToken, userId };

    storeUserDetails(userDetails);
    setUser({ username: resUserName, userId });
    navigate("/app/dashboard");
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  const register = async (username: string, password: string) => {
    const { username: resUserName, accessToken, userId } = await registerUser(
      username,
      password,
    );

    const userDetails: IUserDetails = { username: resUserName, accessToken, userId };

    storeUserDetails(userDetails);
    setUser({ username: resUserName, userId });
    navigate("/app/dashboard");
  };

  // Return the provider with the user state and login and logout functions
  return (
    <authContext.Provider value={{ user, login, logout, register }}>
      {children}
    </authContext.Provider>
  );
};
