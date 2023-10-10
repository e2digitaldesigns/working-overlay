import React from "react";

import * as Styled from "./ProjectInfo.style";
import { BroadcastChannels, StorageKeys } from "../../../types";

export const ProjectInfo: React.FC = () => {
  const [time, setTime] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const militaryTime = `${hours} : ${minutes} : ${seconds}`;
      setTime(militaryTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const projectInformation = window.localStorage.getItem(
      StorageKeys.ProjectInformation
    );
    if (projectInformation)
      setTitle(JSON.parse(projectInformation).title || "");
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel(BroadcastChannels.Project);

    channel.onmessage = event => {
      setTitle(event.data.title);
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <Styled.ProjectInfoWrapper>
      <Styled.Date>
        {formattedDate} {time}
      </Styled.Date>

      <Styled.Project>
        <span>Project:</span> {title}
      </Styled.Project>
    </Styled.ProjectInfoWrapper>
  );
};
