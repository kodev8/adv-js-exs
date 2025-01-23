import React, { useState, useRef } from "react";
import { Pressable, Text, View, Animated, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Task } from "../types/task";
import { Swipeable } from "react-native-gesture-handler";
import { useDB } from "@/hooks/useDB";
import TaskModal from "./TaskModal";

interface TaskItemProps {
  task: Task;
  onPress: (task: Task) => void;
}

export default function TaskItem({ task, onPress }: TaskItemProps) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isSwipeOpen, setIsSwipeOpen] = useState(false);
  const { deleteTask, updateTask, tasks, setTasks } = useDB();
  const swipeableRef = useRef<Swipeable>(null);

  const getIconName = () => {
    switch (task.status) {
      case "todo":
        return "checkbox-blank-circle-outline";
      case "inProgress":
        return "progress-check";
      case "done":
        return "checkbox-marked-circle";
      default:
        return "checkbox-blank-circle-outline";
    }
  };

  const getIconColor = () => {
    switch (task.status) {
      case "todo":
        return "gray";
      case "inProgress":
        return "orange";
      case "done":
        return "green";
      default:
        return "gray";
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <Pressable
        onPress={async () => {
          try {
            const response = await deleteTask(task.id);
            if (response.success) {
              // Update only the specific task being deleted
              const updatedTasks = tasks.filter((t) => t.id !== task.id);
              setTasks(updatedTasks);
            } else {
              Alert.alert("Error", `Failed to delete task ${response.message}`);
            }
          } catch (error) {
            Alert.alert("Error", `Failed to delete task ${error}`);
          }
        }}
        className="bg-red-500 justify-center items-center rounded-r-xl"
        style={{ width: 70, height: 71 }}
      >
        <MaterialCommunityIcons name="trash-can" size={24} color="white" />
      </Pressable>
    );
  };

  const handleLongPress = () => {
    setEditModalVisible(true);
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        rightThreshold={40}
        overshootRight={false}
        onSwipeableWillOpen={() => setIsSwipeOpen(true)}
        onSwipeableWillClose={() => setIsSwipeOpen(false)}
      >
        <Pressable
          className={`p-4 flex-row items-start gap-3 bg-white shadow-sm mb-2`}
          style={{
            height: 71,
            borderTopRightRadius: isSwipeOpen ? 0 : 12,
            borderBottomRightRadius: isSwipeOpen ? 0 : 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          onPress={() => onPress(task)}
          onLongPress={handleLongPress}
        >
          <MaterialCommunityIcons
            name={getIconName()}
            size={24}
            color={getIconColor()}
          />
          <View className="flex-1">
            <Text
              className={`text-gray-800 text-base font-PoppinsRegular ${
                task.status === "done" ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </Text>
            {task.description && (
              <Text className="text-gray-500 text-sm mt-1 font-PoppinsRegular">
                {task.description}
              </Text>
            )}
          </View>
        </Pressable>
      </Swipeable>

      <TaskModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={async (updatedTask) => {
          await updateTask(updatedTask);
          setEditModalVisible(false);
        }}
        task={task}
        mode="edit"
      />
    </>
  );
}
