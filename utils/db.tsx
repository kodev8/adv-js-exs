import Task from "@/types/task";
import Project from "@/types/project";
import User from "@/types/user";
import { v4 as uuidv4 } from "uuid";
import dummyUsers from "../data/users.json";
import dummyProjects from "../data/projects.json";
import dummyTasks from "../data/tasks.json";
import { useState, createContext } from "react";

type Response = {
  success: boolean;
  message: string;
  data: any;
};

export type DBContextType = {
  users: User[];
  projects: Project[];
  tasks: Task[];
  user: User | null;
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  getUsers: () => Promise<User[]>;
  getUserByUsername: (
    identifier: string,
    type: "username" | "email"
  ) => Promise<User | undefined>;
  createUser: (user: Omit<User, "id">) => Promise<Response>;
  updateUser: (user: User) => Promise<Response>;
  signIn: (email: string, password: string) => Promise<Response | undefined>;
  getProjects: () => Promise<Project[]>;
  getProjectById: (id: string) => Promise<Project | undefined>;
  getProjectTasks: (projectId: string) => Promise<Task[]>;
  createProject: (project: Project) => Promise<Response>;
  updateProject: (project: Project) => Promise<Response>;
  deleteProject: (id: string) => Promise<Response>;
  getTasks: () => Promise<Task[]>;
  getTaskById: (id: string) => Promise<Task | undefined>;
  createTask: (task: Task) => Promise<Response>;
  updateTask: (task: Task) => Promise<Response>;
  deleteTask: (id: string) => Promise<Response>;
  changeTaskStatus: (
    taskId: string,
    newStatus: Task["status"]
  ) => Promise<Response>;
};

export const DBContext = createContext<DBContextType>({
  users: [],
  projects: [],
  tasks: [],
  user: null,
  setUser: () => {},
  setUsers: () => {},
  setProjects: () => {},
  setTasks: () => {},
  getUsers: async () => [],
  getUserByUsername: async () => undefined,
  createUser: async () => ({ success: false, message: "", data: null }),
  updateUser: async () => ({ success: false, message: "", data: null }),
  signIn: async () => undefined,
  getProjects: async () => [],
  getProjectById: async () => undefined,
  getProjectTasks: async () => [],
  createProject: async () => ({ success: false, message: "", data: null }),
  updateProject: async () => ({ success: false, message: "", data: null }),
  deleteProject: async () => ({ success: false, message: "", data: null }),
  getTasks: async () => [],
  getTaskById: async () => undefined,
  createTask: async () => ({ success: false, message: "", data: null }),
  updateTask: async () => ({ success: false, message: "", data: null }),
  deleteTask: async () => ({ success: false, message: "", data: null }),
  changeTaskStatus: async () => ({ success: false, message: "", data: null }),
});

const DBContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [projects, setProjects] = useState<Project[]>(
    dummyProjects as Project[]
  );
  const [tasks, setTasks] = useState<Task[]>(dummyTasks as Task[]);
  const [user, setUser] = useState<User | null>(null);

  // Users
  const getUsers = async (): Promise<User[]> => {
    return users;
  };

  const getUserByUsername = async (
    identifier: string,
    type: "username" | "email"
  ): Promise<User | undefined> => {
    const users = await getUsers();
    return users.find((user: any) => user[type] === identifier);
  };

  const createUser = async (user: Omit<User, "id">): Promise<Response> => {
    const users = await getUsers();
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    setUsers(users);
    try {
      return {
        success: true,
        message: "User created successfully",
        data: newUser,
      };
    } catch (error) {
      return { success: false, message: "Failed to create user", data: null };
    }
  };

  const updateUser = async (user: User): Promise<Response> => {
    const users = await getUsers();
    const index = users.findIndex((u: User) => u.id === user.id);
    users[index] = user;
    setUsers(users);
    try {
      return {
        success: true,
        message: "User updated successfully",
        data: user,
      };
    } catch (error) {
      return { success: false, message: "Failed to update user", data: null };
    }
  };

  // Auth
  const signIn = async (
    email: string,
    password: string
  ): Promise<Response | undefined> => {
    const users = await getUsers();

    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) {
      return { success: false, message: "User not found", data: null };
    }
    setUser(user);
    return { success: true, message: "User found", data: user };
  };

  // Projects // dont get projects and tasks by userid yet since it is a mock
  const getProjects = async (): Promise<Project[]> => {
    return projects;
  };

  const getProjectById = async (id: string): Promise<Project | undefined> => {
    const projects = await getProjects();
    return projects.find((project: Project) => project.id === id);
  };

  const getProjectTasks = async (projectId: string): Promise<Task[]> => {
    const tasks = await getTasks();
    return tasks.filter((task: Task) => task.projectId === projectId);
  };

  const createProject = async (project: Project): Promise<Response> => {
    try {
      const newProject = { ...project };
      setProjects([...projects, newProject]);
      return {
        success: true,
        message: "Project created successfully",
        data: newProject,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create project",
        data: null,
      };
    }
  };

  const updateProject = async (project: Project): Promise<Response> => {
    const projects = await getProjects();
    const index = projects.findIndex((p: Project) => p.id === project.id);
    projects[index] = project;
    setProjects(projects);
    return {
      success: true,
      message: "Project updated successfully",
      data: project,
    };
  };

  const deleteProject = async (id: string): Promise<Response> => {
    try {
      // Remove project
      const updatedProjects = projects.filter((p) => p.id !== id);

      // Remove associated tasks
      const updatedTasks = tasks.filter((t) => t.projectId !== id);

      // Update both states
      setProjects(updatedProjects);
      setTasks(updatedTasks);

      return {
        success: true,
        message: "Project and tasks deleted successfully",
        data: { projects: updatedProjects, tasks: updatedTasks },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete project",
        data: null,
      };
    }
  };

  // Tasks
  const getTasks = async (): Promise<Task[]> => {
    return tasks as Task[];
  };

  const getTaskById = async (id: string): Promise<Task | undefined> => {
    const tasks = await getTasks();
    return tasks.find((task: Task) => task.id === id);
  };

  const createTask = async (task: Task): Promise<Response> => {
    try {
      const newTask = { ...task };
      setTasks([...tasks, newTask]);
      return { 
        success: true, 
        message: "Task created successfully", 
        data: newTask 
      };
    } catch (error) {
      return { 
        success: false, 
        message: "Failed to create task", 
        data: null 
      };
    }
  };

  const updateTask = async (task: Task): Promise<Response> => {
    const currentTasks = [...tasks];
    const index = currentTasks.findIndex((t: Task) => t.id === task.id);
    currentTasks[index] = task;
    setTasks(currentTasks);
    return { success: true, message: "Task updated successfully", data: task };
  };

  const changeTaskStatus = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    try {
      const currentTasks = [...tasks];
      const taskIndex = currentTasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const updatedTask = { ...currentTasks[taskIndex], status: newStatus };
        currentTasks[taskIndex] = updatedTask;
        setTasks(currentTasks);
        return {
          success: true,
          message: "Task status updated",
          data: updatedTask,
        };
      }
      return { success: false, message: "Task not found", data: null };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update task status",
        data: null,
      };
    }
  };

  const deleteTask = async (id: string): Promise<Response> => {
    const tasks = await getTasks();
    const index = tasks.findIndex((t: Task) => t.id === id);
    tasks.splice(index, 1);
    setTasks(tasks);
    return { success: true, message: "Task deleted successfully", data: tasks };
  };

  return (
    <DBContext.Provider
      value={{
        users,
        projects,
        tasks,
        user,
        setUser,
        setUsers,
        setProjects,
        setTasks,
        getUsers,
        getUserByUsername,
        createUser,
        updateUser,
        signIn,
        getProjects,
        getProjectById,
        getProjectTasks,
        createProject,
        updateProject,
        deleteProject,
        getTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
        changeTaskStatus,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
