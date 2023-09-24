import React from "react";
import * as Styled from "./Controls.styles";
import * as TaskStyled from "../TaskList/Task.styles";
import { useNavigate } from "react-router-dom";

import { CheckSquare, Square, Settings, Trash2 } from "react-feather";

type Task = {
  _id: string;
  task: string;
  completed: boolean;
};

export const Controls: React.FC = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const taskListData = window.localStorage.getItem("task-list");
    if (taskListData) setTaskList(JSON.parse(taskListData) || []);
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel("task-list-channel");
    channel.postMessage({ taskList });

    return () => {
      channel.close();
    };
  }, [taskList]);

  const handleAddTask = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const task = e.currentTarget.value;

    if (e.key === "Enter" && !e.shiftKey && task) {
      const newTask = {
        _id: new Date().getTime().toString(),
        task,
        completed: false
      };

      const newTaskList = [...taskList, newTask];
      setTaskList(newTaskList);

      window.localStorage.setItem("task-list", JSON.stringify(newTaskList));
      e.currentTarget.value = ``;
    }
  };

  const handleCompleteToggle = (id: string) => {
    const newTaskList = taskList.map(item => {
      if (item._id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTaskList(newTaskList);
    window.localStorage.setItem("task-list", JSON.stringify(newTaskList));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTaskList = taskList.filter(item => item._id !== id);
    setTaskList(newTaskList);
    window.localStorage.setItem("task-list", JSON.stringify(newTaskList));
  };

  const completedCount = taskList.filter(item => item.completed).length;

  return (
    <Styled.ControlWrapper>
      <Styled.ControlHeader>
        <div>
          <Settings
            onClick={() => navigate("/settings")}
            size={16}
            color="#0090e7"
          />
        </div>

        <TaskStyled.Title>Task Admin</TaskStyled.Title>

        <h2>
          {completedCount}/{taskList.length}
        </h2>
      </Styled.ControlHeader>

      <Styled.ControlTaskListWrapper>
        <TaskStyled.TaskList>
          {taskList.map(item => (
            <Styled.ControlTask
              key={item._id}
              onClick={() => handleCompleteToggle(item._id)}
            >
              <TaskStyled.IconWrapper>
                {item.completed ? (
                  <CheckSquare size={16} color="#0090e7" />
                ) : (
                  <Square size={16} />
                )}
              </TaskStyled.IconWrapper>
              <div
                style={{
                  textDecoration: item.completed ? "line-through" : "none"
                }}
              >
                {item.task}
              </div>
              <Styled.TrashWrapper onClick={e => handleDelete(e, item._id)}>
                <Trash2 size={16} />
              </Styled.TrashWrapper>
            </Styled.ControlTask>
          ))}
        </TaskStyled.TaskList>
      </Styled.ControlTaskListWrapper>

      <Styled.TextArea onKeyDown={handleAddTask} />

      {/* <Styled.Button onClick={handleClear}>Clear</Styled.Button> */}
    </Styled.ControlWrapper>
  );
};
