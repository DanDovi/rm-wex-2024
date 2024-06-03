import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/button";

import { Link } from "react-router-dom";

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
    <div className="flex flex-col gap-4 justify-center items-center h-screen max-w-2xl mx-auto">
      <h1 className="text-2xl text-center font-bold mt-4 mb-4">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto gap-4 mb-4"
      >
        <input
          className="p-2 border rounded-md"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 border rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="p-2 border rounded-md"
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
