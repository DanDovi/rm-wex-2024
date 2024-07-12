import React, { useState } from "react";
import { Link } from "react-router-dom";

import { createTopic } from "../api/topic";
import { Button } from "../components/button";
import { ErrorWithMessage } from "../types";
import styles from "./login.module.css";

export const NewTopic = () => {
  const [title, setTitle] = useState("");
  const [createdBy, setAuthor] = useState(
    "1a2a4afe-87bb-4719-a430-cbf7b5529328",
  );
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTopic(title, createdBy, description);
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Topic</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3 onChange={(e) => setAuthor(e.target.value)}>Authors name here</h3>
        <input
          className="text"
          type="text"
          placeholder="your post's text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Create Topic</Button>
      </form>

      {error && <p>{error}</p>}
      <Link to="/app/topics" className={styles.link}></Link>
    </div>
  );
};
