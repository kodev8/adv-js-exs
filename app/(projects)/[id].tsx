import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types/task";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Menu from "@/components/Menu";
import FAB from "@/components/FAB";
import Project from "@/types/project";
import { useDB } from "@/hooks/useDB";
import ProjectModal from "@/components/ProjectModal";
import { PROJECT_COLORS } from "@/utils/colors";
import TaskModal from "@/components/TaskModal";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const {
    tasks,
    projects,
    updateTask,
    deleteProject,
    updateProject,
    changeTaskStatus,
    createTask,
    setTasks,
    setProjects,
  } = useDB();

  // Get data directly from context
  const project = projects.find((p) => p.id === id);
  const projectTasks = tasks.filter((task) => task.projectId === id);

  useEffect(() => {
    if (project) {
      setEditedTitle(project.title);
    }
  }, [project]);

  const handleTaskStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    try {
      const response = await changeTaskStatus(taskId, newStatus);
      if (response.success) {
        // Update the task in the context
        const updatedTask = response.data;
        updateTask(updatedTask);
      } else {
        Alert.alert("Error", "Failed to update task status");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update task status");
    }
  };

  const handleSaveTitle = async () => {
    if (editedTitle.trim() && project) {
      try {
        // Update project with new title
        const updatedProject = { ...project, title: editedTitle.trim() };
        const response = await updateProject(updatedProject);

        if (response.success) {
          setIsEditing(false);
        } else {
          Alert.alert("Error", "Failed to update project title");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update project title");
        // Reset to original title
        setEditedTitle(project.title);
      }
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      const response = await createTask(task);
      if (response.success) {
        // Update tasks state immediately
        setTasks([...tasks, response.data]);
        setModalVisible(false);
      } else {
        Alert.alert("Error", "Failed to create task");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create task");
    }
  };

  const handleDeleteProject = async () => {
    Alert.alert(
      "Delete Project",
      "Are you sure you want to delete this project? This will also delete all associated tasks.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setMenuVisible(false),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // First update local state
              const updatedTasks = tasks.filter(
                (task) => task.projectId !== id
              );
              const updatedProjects = projects.filter((p) => p.id !== id);
              setTasks(updatedTasks);
              setProjects(updatedProjects);

              // Then call delete
              const response = await deleteProject(id as string);
              if (response.success) {
                router.back();
                Alert.alert(
                  "Success",
                  "Project and associated tasks deleted successfully"
                );
              } else {
                Alert.alert("Error", "Failed to delete project");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete project");
            }
          },
        },
      ]
    );
  };

  const handleEditProject = () => {
    setEditModalVisible(true);
    setMenuVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: project?.title,
        }}
        name="details"
      />
      <SafeAreaView className="flex-1 bg-white">
        <View
          className={`h-72 px-4 relative`}
          style={{ backgroundColor: project?.bg }}
        >
          <LinearGradient
            colors={PROJECT_COLORS[project?.bg || "blue"]}
            className=" inset-0 z-50"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View className="flex-row justify-between items-center">
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={32}
                color="white"
              />
            </Pressable>

            {isEditing ? (
              <View className="flex-row items-center gap-2">
                <TextInput
                  className="text-white text-3xl font-PoppinsSemiBold mt-4 bg-white/20 px-4 py-2 rounded-xl"
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  autoFocus
                  onSubmitEditing={handleSaveTitle}
                  onBlur={() => {
                    if (!editedTitle.trim()) {
                      setEditedTitle(project?.title || "");
                    }
                    setIsEditing(false);
                  }}
                />
                <Pressable onPress={handleSaveTitle}>
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="white"
                  />
                </Pressable>
              </View>
            ) : (
              <Text className="text-white text-3xl font-PoppinsSemiBold mt-4">
                {project?.title}
              </Text>
            )}

            <Pressable onPress={() => setMenuVisible(true)}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="white"
              />
            </Pressable>
          </View>
          <Text className="text-white text-xl font-PoppinsSemiBold mt-4">
            {project?.description}
          </Text>
          <Text className="text-white/80 text-xl font-PoppinsRegular mt-1">
            Tasks ({projectTasks.length})
          </Text>

          <View className="bg-white/20 rounded-full gap-2 px-3 py-1 mt-4">
            {projectTasks.length > 0 ? (
              <Text className="text-white text-base font-PoppinsRegular flex-row flex">
                {projectTasks.filter((task) => task.status === "done").length}/
                {projectTasks.length} completed
              </Text>
            ) : (
              <Text className="text-white text-base font-PoppinsRegular">
                There are no tasks for this project
              </Text>
            )}
          </View>
        </View>

        {projectTasks.length > 0 && (
          <View className="flex-1 px-4 -mt-20">
            <View className="bg-white rounded-3xl p-4 shadow-sm">
              <ScrollView className="gap-4">
                {projectTasks.length !== 0 && (
                  <>
                    {projectTasks.filter((task) => task.status === "todo")
                      .length > 0 && (
                      <View className="mt-6">
                        <Text className="text-gray-500 font-PoppinsRegular mb-4">
                          TODO (
                          {
                            projectTasks.filter(
                              (task) => task.status === "todo"
                            ).length
                          }
                          )
                        </Text>
                        {projectTasks
                          .filter((task) => task.status === "todo")
                          .map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onPress={async (task) => {
                                const statusMap: Record<
                                  string,
                                  Task["status"]
                                > = {
                                  todo: "inProgress",
                                  inProgress: "done",
                                  done: "todo",
                                };
                                await handleTaskStatusChange(
                                  task.id,
                                  statusMap[task.status]
                                );
                              }}
                            />
                          ))}
                      </View>
                    )}

                    {projectTasks.filter((task) => task.status === "inProgress")
                      .length > 0 && (
                      <View className="mt-6">
                        <Text className="text-gray-500 font-PoppinsRegular mb-4">
                          IN PROGRESS (
                          {
                            projectTasks.filter(
                              (task) => task.status === "inProgress"
                            ).length
                          }
                          )
                        </Text>
                        {projectTasks
                          .filter((task) => task.status === "inProgress")
                          .map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onPress={async (task) => {
                                const statusMap: Record<
                                  string,
                                  Task["status"]
                                > = {
                                  todo: "inProgress",
                                  inProgress: "done",
                                  done: "todo",
                                };
                                await handleTaskStatusChange(
                                  task.id,
                                  statusMap[task.status]
                                );
                              }}
                            />
                          ))}
                      </View>
                    )}

                    {projectTasks.filter((task) => task.status === "done")
                      .length > 0 && (
                      <View className="mt-6">
                        <Text className="text-gray-500 font-PoppinsRegular mb-4">
                          COMPLETED (
                          {
                            projectTasks.filter(
                              (task) => task.status === "done"
                            ).length
                          }
                          )
                        </Text>
                        {projectTasks
                          .filter((task) => task.status === "done")
                          .map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onPress={async (task) => {
                                const statusMap: Record<
                                  string,
                                  Task["status"]
                                > = {
                                  todo: "inProgress",
                                  inProgress: "done",
                                  done: "todo",
                                };
                                await handleTaskStatusChange(
                                  task.id,
                                  statusMap[task.status]
                                );
                              }}
                            />
                          ))}
                      </View>
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        )}

        <FAB
          onPress={() => setModalVisible(true)}
          className="absolute bottom-8 right-6"
        />
      </SafeAreaView>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTask}
        mode="create"
        projectId={id as string}
      />

      <Menu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      <ProjectModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={async (updatedProject) => {
          try {
            const response = await updateProject(updatedProject);
            if (response.success) {
              const updatedProjects = projects.map((p) =>
                p.id === updatedProject.id ? updatedProject : p
              );
              setProjects(updatedProjects);
              setEditModalVisible(false);
              Alert.alert("Success", "Project updated successfully");
            } else {
              Alert.alert("Error", "Failed to update project");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to update project");
          }
        }}
        project={project!}
        mode="edit"
      />
    </GestureHandlerRootView>
  );
}
