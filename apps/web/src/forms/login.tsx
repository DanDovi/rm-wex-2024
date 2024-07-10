import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";

import styles from "./auth.module.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
      if (username.length === 0 || password.length === 0) {
        setError("Please enter a username or password")
        return;
      }
      await login(username, password);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.formContainer}>
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

        <Button type="submit">Login</Button>
      </form>
      {/* {password.length === 0 && <div>Please enter a password</div>} */}
      {error && <p>{error}</p>}
      <Link to="/register" className={styles.link}>
        Register
      </Link>
    </div>
  );
};
