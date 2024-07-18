
import ContentContainer from "../components/contentContainer";
import sharedStyles from "./shared.module.css";

export const CreateComment = () => {
   return (
    <div className={sharedStyles.view}>
      <ContentContainer title="comment">
        <p>I am the dashboard</p>
        
      </ContentContainer>
    </div>
  );
};