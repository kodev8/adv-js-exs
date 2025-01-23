import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import ProjectCard from "@/components/ProjectCard";
import { useDB } from "@/hooks/useDB";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import FAB from "@/components/FAB";
import { useRouter } from "expo-router";
import Project from "@/types/project";

export default function ProjectsScreen() {
  const { projects, createProject, setProjects } = useDB();
  const { user } = useDB();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateProject = async (newProject: Project) => {
    try {
      const response = await createProject(newProject);
      if (response.success) {
        // Only update state with the response data
        setProjects([...projects, response.data]);
        setModalVisible(false);
        Alert.alert("Success", "Project created successfully");
      } else {
        Alert.alert("Error", "Failed to create project");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create project");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Projects",
        }}
      />

      <ScrollView className="flex-1 px-6">
        <View className="flex-row justify-between items-center mt-12 mb-8">
          <View>
            <Text className="text-gray-500 font-PoppinsRegular">
              Hello, {user?.name}
            </Text>
            <View className="flex flex-row flex-1 items-center justify-between gap-2 w-full">
              <Text className="text-2xl font-PoppinsSemiBold mt-1">
                Your Projects ({projects.length})
              </Text>
              <FAB
                onPress={() => setModalVisible(true)}
                className="h-10! w-10!"
              />
            </View>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4">
          {projects?.map((project) => (
            <ProjectCard key={project.id} id={project.id} />
          ))}
        </View>
      </ScrollView>

      <ProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleCreateProject}
        mode="create"
      />
    </SafeAreaView>
  );
}
