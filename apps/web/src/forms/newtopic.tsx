import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createTopic } from "../api/topic";
import { AuthBanner } from "../components/authBanner";
import { Button } from "../components/button";
import { ErrorWithMessage } from "../types";
import styles from "./newtopic.module.css";

export const NewTopic = () => {
  const [title, setTitle] = useState("");
  const [createdBy, setAuthor] = useState(
    "1a2a4afe-87bb-4719-a430-cbf7b5529328",
  );
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTopic(title, createdBy, description);
      navigate("/app/dashboard");
    } catch (e) {
      const errorWithMessage = e as ErrorWithMessage;
      setError(errorWithMessage.message);
    }
  };

  return (
    <div className={styles.newtopic}>
      <AuthBanner />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <p>Title</p>
          <input
            className="Title"
            type="text"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p>Body (Optional)</p>
          <input
            className="text"
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" className={styles.createTopicButton}>
            Publish
          </Button>
        </form>
      </div>

      {error && <p>{error}</p>}
      <Link to="/app/topics" className={styles.link}></Link>
    </div>
  );
};
