import React from "react";
import * as Styled from "./Task.styles";

import { CheckSquare, Square } from "react-feather";
import { BroadcastChannels, StorageKeys, TodoTask } from "../../types";

export const Tasks: React.FC = () => {
  const [taskList, setTaskList] = React.useState<TodoTask[]>([]);
  const [subTitle, setSubTitle] = React.useState<string>("Task");

  React.useEffect(() => {
    const taskInformation = window.localStorage.getItem(
      StorageKeys.TaskInformation
    );
    if (taskInformation) setSubTitle(JSON.parse(taskInformation).subTitle);
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel(BroadcastChannels.Task);

    channel.onmessage = event => {
      setSubTitle(event.data.subTitle);
    };

    return () => {
      channel.close();
    };
  }, []);

  React.useEffect(() => {
    const taskListData = window.localStorage.getItem(StorageKeys.TaskList);
    if (taskListData) setTaskList(JSON.parse(taskListData) || []);
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel(BroadcastChannels.TaskList);
    channel.onmessage = event => {
      setTaskList(event.data.taskList);
    };

    return () => {
      channel.close();
    };
  }, []);

  const completedCount = taskList.filter(item => item.completed).length;

  return (
    <Styled.TaskWrapper>
      <Styled.Header>
        <Styled.Title>{subTitle}</Styled.Title>

        <Styled.TaskCount>
          {completedCount}/{taskList.length}
        </Styled.TaskCount>
      </Styled.Header>

      <Styled.TaskList>
        {taskList.map(item => (
          <Styled.Task key={item._id}>
            <Styled.IconWrapper>
              {item.completed ? (
                <CheckSquare size={16} color="#0090e7" />
              ) : (
                <Square size={16} />
              )}
            </Styled.IconWrapper>
            <Styled.TaskText
              style={{
                color: item.completed ? "#777" : "inherit",
                textDecoration: item.completed ? "line-through" : "none"
              }}
            >
              {item.task}
            </Styled.TaskText>
          </Styled.Task>
        ))}
      </Styled.TaskList>
    </Styled.TaskWrapper>
  );
};
