import React from "react";
import * as Styled from "./Overlay.style";
import { Tasks } from "../TaskList/Task";
import { Camera } from "./Camera/Camera";
import { ProjectInfo } from "./ProjectInfo/ProjectInfo";

export const Overlay: React.FC = () => {
  return (
    <Styled.SidebarWrapper>
      <Camera />
      <ProjectInfo />
      <Tasks />
    </Styled.SidebarWrapper>
  );
};
