import React from "react";

import ContentContainer from "../components/contentContainer";
import sharedStyles from "./shared.module.css";

const Post: React.FC = () => {
  return (
    <div className={sharedStyles.view}>
      <ContentContainer title="Post">
        <div>I am a Post</div>
      </ContentContainer>
    </div>
  );
};

export { Post };
