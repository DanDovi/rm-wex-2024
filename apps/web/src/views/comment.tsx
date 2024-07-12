import React from "react";

import ContentContainer from "../components/contentContainer";
import sharedStyles from "./shared.module.css";
import { Button } from "../components/button";
import { IPostResponse, getAllComments } from "../api/newComment";

const Dashboard: React.FC = () => {
  const [data, setData] = React.useState<IPostResponse>();

  const getComments = async () => {
    try {
      const data = await getAllComments();
      setData(data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    void getAllComments();
  }, []);

  console.log("KACHOW: ", data?.data);
  return (
    <div className={sharedStyles.view}>
      <ContentContainer title="comment">
        <p>I am the dashboard</p>
        {data?.data?.map((item) => (
          <div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
            <div>
              {item.createdBy}
            </div>
          </div>
        ))}
      </ContentContainer>
    </div>
  );
};

export { Dashboard };