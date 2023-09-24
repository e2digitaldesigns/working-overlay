import React from "react";
import * as Styled from "./Task.styles";

import { CheckSquare, Square } from "react-feather";

type TTask = {
  _id: string;
  task: string;
  completed: boolean;
};

export const Task: React.FC = () => {
  const [taskList, setTaskList] = React.useState<TTask[]>([]);

  React.useEffect(() => {
    const taskListData = window.localStorage.getItem("task-list");
    if (taskListData) setTaskList(JSON.parse(taskListData) || []);
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel("task-list-channel");
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
        <Styled.Title>!Task</Styled.Title>

        <h2>
          {completedCount}/{taskList.length}
        </h2>
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
