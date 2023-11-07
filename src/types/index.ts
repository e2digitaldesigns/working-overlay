export enum BroadcastChannels {
  TaskList = "task-list-channel",
  Project = "project-information-channel",
  Task = "task-information-channel"
}

export enum StorageKeys {
  ProjectInformation = "project-information",
  TaskInformation = "task-information",
  TaskList = "task-list"
}

export type TodoTask = {
  _id: string;
  task: string;
  currentTask?: boolean;
  completed: boolean;
};

export enum AppRoutes {
  Controls = "/controls",
  Overlay = "/overlay",
  Settings = "/settings"
}
