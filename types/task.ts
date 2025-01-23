export type TaskStatus = "todo" | "inProgress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: string;
  date: Date | string;
}

export default Task;
