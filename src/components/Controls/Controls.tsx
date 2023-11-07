import React from "react";
import * as Styled from "./Controls.styles";
import * as TaskStyled from "../TaskList/Task.styles";
import { useNavigate } from "react-router-dom";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

import { Activity, CheckSquare, Square, Settings, Trash2 } from "react-feather";
import {
  AppRoutes,
  BroadcastChannels,
  StorageKeys,
  TodoTask
} from "../../types";

export const Controls: React.FC = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = React.useState<TodoTask[]>([]);
  const [newTaskText, setNewTaskText] = React.useState<string>("");

  React.useEffect(() => {
    const taskListData = window.localStorage.getItem(StorageKeys.TaskList);
    if (taskListData) setTaskList(JSON.parse(taskListData) || []);
  }, []);

  React.useEffect(() => {
    const channel = new BroadcastChannel(BroadcastChannels.TaskList);
    channel.postMessage({ taskList });

    return () => {
      channel.close();
    };
  }, [taskList]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskText(e.currentTarget.value);
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && newTaskText) {
      const newTask = {
        _id: new Date().getTime().toString(),
        task: newTaskText,
        completed: false
      };

      const newTaskList = [...taskList, newTask];
      setTaskList(newTaskList);

      window.localStorage.setItem(
        StorageKeys.TaskList,
        JSON.stringify(newTaskList)
      );

      setNewTaskText("");
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
    window.localStorage.setItem(
      StorageKeys.TaskList,
      JSON.stringify(newTaskList)
    );
  };

  const handleSetCurrent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    const newTaskList = taskList.map(item => {
      if (item._id === id) {
        item.currentTask = !item.currentTask;
      } else {
        item.currentTask = false;
      }
      return item;
    });

    setTaskList(newTaskList);
    window.localStorage.setItem(
      StorageKeys.TaskList,
      JSON.stringify(newTaskList)
    );
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTaskList = taskList.filter(item => item._id !== id);
    setTaskList(newTaskList);
    window.localStorage.setItem(
      StorageKeys.TaskList,
      JSON.stringify(newTaskList)
    );
  };

  const completedCount = taskList.filter(item => item.completed).length;

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, _id: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("_id", _id);
  };

  const handleDropTopic = async (
    e: React.DragEvent<HTMLLIElement>,
    _id: string
  ): Promise<void> => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("_id");
    if (dragId === _id) return;

    const tempTask = _cloneDeep(taskList);

    const dragIndex = _findIndex(tempTask, (f: TodoTask) => f._id === dragId);
    const dropIndex = _findIndex(tempTask, (f: TodoTask) => f._id === _id);
    const dragTask = tempTask[dragIndex];

    if (dragIndex > dropIndex) {
      tempTask.splice(dragIndex, 1);
      tempTask.splice(dropIndex, 0, dragTask);
    }

    if (dragIndex < dropIndex) {
      tempTask.splice(dropIndex + 1, 0, dragTask);
      tempTask.splice(dragIndex, 1);
    }

    setTaskList(tempTask);
    window.localStorage.setItem(StorageKeys.TaskList, JSON.stringify(tempTask));
  };

  return (
    <Styled.ControlWrapper>
      <Styled.ControlHeader>
        <Settings
          onClick={() => navigate(AppRoutes.Settings)}
          size={16}
          color="#0090e7"
        />

        <Styled.Title>Task Admin</Styled.Title>

        <div>
          {completedCount}/{taskList.length}
        </div>
      </Styled.ControlHeader>

      <Styled.ControlTaskListWrapper>
        <TaskStyled.TaskList>
          {taskList.map(item => (
            <Styled.ControlTask
              key={item._id}
              onClick={() => handleCompleteToggle(item._id)}
              draggable={true}
              onDragStart={(e: React.DragEvent<HTMLLIElement>) =>
                handleDragStart(e, item._id)
              }
              onDragOver={e => {
                e.preventDefault();
              }}
              onDrop={(e: React.DragEvent<HTMLLIElement>) =>
                handleDropTopic(e, item._id)
              }
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

              <Styled.TaskIconWrapper
                onClick={e => handleSetCurrent(e, item._id)}
              >
                {item?.currentTask ? (
                  <Activity size={16} color="#0090e7" />
                ) : (
                  <Activity size={16} color="#888" />
                )}
              </Styled.TaskIconWrapper>

              <Styled.TaskIconWrapper onClick={e => handleDelete(e, item._id)}>
                <Trash2 size={16} />
              </Styled.TaskIconWrapper>
            </Styled.ControlTask>
          ))}
        </TaskStyled.TaskList>
      </Styled.ControlTaskListWrapper>

      <Styled.TextArea
        onChange={handleOnChange}
        onKeyDown={handleAddTask}
        value={newTaskText}
      />
    </Styled.ControlWrapper>
  );
};
