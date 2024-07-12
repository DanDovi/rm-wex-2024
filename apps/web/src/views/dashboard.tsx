import React from "react";

import ContentContainer from "../components/contentContainer";
import { useGetAllTopics } from "../hooks/useGetAllTopics";
import sharedStyles from "./shared.module.css";

const Dashboard: React.FC = () => {
  const { topics } = useGetAllTopics();
  console.log(topics);

  return (
    <div className={sharedStyles.view}>
      <ContentContainer title="Dashboard">
        <button onClick={() => console.log(topics)}>Topics</button>
        {topics?.map((topic) => <li>{topic.title}</li>)}
      </ContentContainer>
    </div>
  );
};

export { Dashboard };
