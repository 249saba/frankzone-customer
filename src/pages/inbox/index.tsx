import ContentContainer from "@src/containers/contentContainer";
import { Outlet } from "react-router-dom";

const Inbox = () => {
  return (
    <ContentContainer styleClass="gap-10">
      <Outlet />
    </ContentContainer>
  );
};

export default Inbox;
