import React from "react";

import ContentContainer from "../components/contentContainer";
import sharedStyles from "./shared.module.css";

const Dashboard: React.FC = () => {
  return (
    <div className={sharedStyles.view}>
      <ContentContainer title="Dashboard">
        <p>I am the dashboard</p>
      </ContentContainer>
    </div>
  );
};

export { Dashboard };
