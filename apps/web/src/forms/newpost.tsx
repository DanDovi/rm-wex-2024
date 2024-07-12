import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { ErrorWithMessage } from "../types";
import styles from "./login.module.css";

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { createpost } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createpost(title, text);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="text"
          type="text"
          placeholder="your post's text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">Create Post</Button>
      </form>

      {error && <p>{error}</p>}
      <Link to="/app/post" className={styles.link}></Link>
    </div>
  );
};
