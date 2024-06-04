import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-4">
      <h1 className="mb-4 mt-4 text-center text-2xl font-bold">Login</h1>
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
        <Button type="submit">Login</Button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  );
};
