import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";

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
      setError("");
      await register(username, password);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-4">
      <h1 className="mb-4 mt-4 text-center text-2xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-4 flex w-3/4 flex-col gap-4"
      >
        <input
          className="rounded-md border p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="rounded-md border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="rounded-md border p-2"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/login" className="text-blue-500 hover:underline">
        Already have an account? Login
      </Link>
    </div>
  );
};
