import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/launchpad-logo.png";
import { AuthBanner } from "../components/authBanner";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";
import styles from "./login.module.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (username.length === 0 || password.length === 0) {
        setError("Please enter a username or password");
        return;
      }
      await login(username, password);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.login}>
      <AuthBanner />
      <div className={styles.formContainer}>
        <img src={logo} alt="Launchpad logo" className={styles.logo} />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="formInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="formInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className={styles.loginButton} type="submit">
            Login
          </Button>
        </form>
        {error && <p>{error}</p>}
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </div>
    </div>
  );
};
