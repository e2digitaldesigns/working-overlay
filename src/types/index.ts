export enum BroadcastChannels {
  TaskList = "task-list-channel",
  Project = "project-information-channel",
  Task = "task-information-channel",
  Global = "global-information-channel"
}

export enum StorageKeys {
  ProjectInformation = "project-information",
  TaskInformation = "task-information",
  TaskList = "task-list",
  GlobalInformation = "global-information"
}

export type TodoTask = {
  _id: string;
  completed: boolean;
  currentTask?: boolean;
  task: string;
  timeInSeconds?: number;
};

export enum AppRoutes {
  Controls = "/controls",
  Overlay = "/overlay",
  Settings = "/settings"
}
