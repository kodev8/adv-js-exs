import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useDB } from "@/hooks/useDB";
import Project from "@/types/project";
import Task from "@/types/task";
import { useEffect } from "react";
import { PROJECT_COLORS } from "@/utils/colors";
import { Dimensions } from "react-native";

type LinearGradientProps = {
  colors: [string, string, ...string[]];
};

interface ProjectCardProps {
  id: string;
}

export default function ProjectCard({ id }: ProjectCardProps) {
  const { projects, tasks } = useDB();

  const project = projects.find((p) => p.id === id);
  const projectTasks = tasks.filter((task) => task.projectId === id);
  const completedTasks = projectTasks.filter((task) => task.status === "done");

  const deviceWidth = Dimensions.get("window").width;

  return (
    <View className="rounded-md">
      <Pressable onPress={() => router.push(`/(projects)/${id}`)}>
        <LinearGradient
          colors={PROJECT_COLORS[project?.bg || "blue"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 10,
            padding: 10,
            flex: 1,
            width: deviceWidth - 40,
          }}
        >
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-white text-wrap  w-full font-PoppinsSemiBold text-xl">
                {project?.title}
              </Text>
              {project?.description && (
                <Text className="text-white/60 text-sm mt-1 font-PoppinsRegular font-semibold">
                  {project.description}
                </Text>
              )}
            </View>
          </View>

          <View className="flex flex-row items-center bg-white/20 rounded-full px-2 py-1 gap-2">
            <Text className="text-white text-sm font-PoppinsRegular text-center">
              {projectTasks.length === 0
                ? "No tasks"
                : `${completedTasks.length}/${projectTasks.length} tasks`}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
