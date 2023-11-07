import React from "react";
import * as Styled from "./Settings.style";
import { useNavigate } from "react-router-dom";

import { XCircle } from "react-feather";
import { AppRoutes, BroadcastChannels, StorageKeys } from "../../types";

interface ISettingsProps {
  globalInformation: any;
  handleCheckBoxChange: any;
}

export const Settings: React.FC<ISettingsProps> = ({
  globalInformation,
  handleCheckBoxChange
}) => {
  const navigate = useNavigate();
  const [subTitle, setSubTitle] = React.useState<string>("Task");
  const [title, setTitle] = React.useState<string>("");

  React.useEffect(() => {
    const taskInformation = window.localStorage.getItem(
      StorageKeys.TaskInformation
    );

    const projectInformation = window.localStorage.getItem(
      StorageKeys.ProjectInformation
    );

    if (projectInformation) setTitle(JSON.parse(projectInformation).title);
    if (taskInformation) setSubTitle(JSON.parse(taskInformation).subTitle);
  }, []);

  const handleClearAllTasks = () => {
    window.localStorage.removeItem(StorageKeys.TaskList);
    const channel = new BroadcastChannel(BroadcastChannels.TaskList);
    channel.postMessage({ taskList: [] });
  };

  const channel = new BroadcastChannel(BroadcastChannels.Project);
  const channelTask = new BroadcastChannel(BroadcastChannels.Task);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setTitle(title);
    const projectInformation = JSON.stringify({ title });
    window.localStorage.setItem(
      StorageKeys.ProjectInformation,
      projectInformation
    );
    channel.postMessage({ title });
  };

  const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subTitle = e.currentTarget.value;
    setSubTitle(subTitle);
    const projectInformation = JSON.stringify({ subTitle });
    window.localStorage.setItem(
      StorageKeys.TaskInformation,
      projectInformation
    );
    channelTask.postMessage({ subTitle });
  };

  return (
    <>
      <Styled.SettingsWrapper>
        <Styled.HeaderWrapperGrid>
          <XCircle onClick={() => navigate(AppRoutes.Controls)} />
          <h3>Settings</h3>
        </Styled.HeaderWrapperGrid>

        <Styled.OptionsWrapperGridInner>
          <div>Title</div>
          <div>
            <input
              onChange={handleTitleChange}
              type="text"
              placeholder="Enter Title"
              value={title}
            />
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Sub Title</div>
          <div>
            <input
              onChange={handleSubTitleChange}
              type="text"
              placeholder="Enter SubTitle"
              value={subTitle}
            />
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Show Timer</div>
          <div>
            <input
              checked={globalInformation.showTimer}
              name="showTimer"
              onChange={handleCheckBoxChange}
              type="checkbox"
            />
          </div>
        </Styled.OptionsWrapperGridInner>

        <Styled.OptionsWrapperGridInner>
          <div>Clear Task</div>
          <div>
            <button onClick={handleClearAllTasks}>Clear All Task</button>
          </div>
        </Styled.OptionsWrapperGridInner>
      </Styled.SettingsWrapper>
    </>
  );
};
