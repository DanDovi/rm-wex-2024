import React from "react";

import ContentContainer from "../components/contentContainer";
import sharedStyles from "./shared.module.css";

const Topic: React.FC = () => {
  return (
    <div className={sharedStyles.view}>
      <ContentContainer title="Topic">
        <div>I am a topic</div>
      </ContentContainer>
    </div>
  );
};

export { Topic };
