import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/launchpad-logo.png";
import { AuthBanner } from "../components/authBanner";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";
import styles from "./register.module.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (username.length === 0) {
        setError("Error, please enter a username");

        return;
      }
      if (password.length > 30 || username.length > 30) {
        setError(
          "Error, Your username or password is over the 30 character limit",
        );
        return;
      }
      setError("");
      await register(username, password);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.register}>
      <AuthBanner />
      <div className={styles.formContainer}>
        <img src={logo} alt="Launchpad logo" className={styles.logo} />
        <h1>Register</h1>
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
          <input
            className="formInput"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </form>
        {error && <p>{error}</p>}
        <Link to="/login" className={styles.link}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};
