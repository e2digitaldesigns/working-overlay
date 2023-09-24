import React from "react";
import * as Styled from "./Settings.style";
import { useNavigate } from "react-router-dom";

import { XCircle, ToggleLeft, ToggleRight } from "react-feather";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const showSingleWordMessages = false;

  const handleClearAllTasks = () => {
    window.localStorage.removeItem("task-list");
    const channel = new BroadcastChannel("task-list-channel");
    channel.postMessage({ taskList: [] });
  };

  const channel = new BroadcastChannel("project-info-channel");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    const projectInformation = JSON.stringify({ title });
    window.localStorage.setItem("project-info", projectInformation);

    channel.postMessage({ title });
  };

  return (
    <>
      <Styled.SettingsWrapper>
        <Styled.HeaderWrapperGrid>
          <XCircle onClick={() => navigate("/controls")} />
          <h3>Settings</h3>
        </Styled.HeaderWrapperGrid>

        <Styled.OptionsWrapperGridInner>
          <div>Show single word messages:</div>
          <div>{showSingleWordMessages ? <ToggleRight /> : <ToggleLeft />}</div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Title</div>
          <div>
            <button onClick={handleClearAllTasks}>Clear All Task</button>
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Clear Chat</div>
          <div>
            <input
              onChange={handleTitleChange}
              type="text"
              placeholder="Enter Title"
            />
          </div>
        </Styled.OptionsWrapperGridInner>
      </Styled.SettingsWrapper>
    </>
  );
};
