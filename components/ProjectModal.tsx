import { View, Text, TextInput, Pressable, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import Project from "@/types/project";
import { PROJECT_COLORS } from "@/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./CustomButton";

interface ProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project; // Make optional for new projects
  mode: "edit" | "create";
}

export default function ProjectModal({
  visible,
  onClose,
  onSave,
  project,
  mode,
}: ProjectModalProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [selectedColor, setSelectedColor] = useState<
    keyof typeof PROJECT_COLORS
  >(project?.bg || "blue");

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: project?.id || Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        bg: selectedColor,
        userId: project?.userId || "user1", // Replace with actual user ID
      });
      // Reset form for create mode
      if (mode === "create") {
        setTitle("");
        setDescription("");
        setSelectedColor("blue");
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-4 border-b border-gray-100">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-PoppinsSemiBold">
              {mode === "edit" ? "Edit Project" : "New Project"}
            </Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <View className="px-6 flex-1">
          <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2">
            TITLE
          </Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-xl font-PoppinsRegular mb-4"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2">
            DESCRIPTION
          </Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-xl font-PoppinsRegular"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholder="Add a description..."
          />

          <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2 mt-4">
            COLOR
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {(
              Object.keys(PROJECT_COLORS) as Array<keyof typeof PROJECT_COLORS>
            ).map((color) => (
              <Pressable
                key={color}
                onPress={() => setSelectedColor(color)}
                className={`rounded-full p-0.5 ${
                  selectedColor === color
                    ? "border-2 border-black"
                    : "border-2 border-gray-100"
                }`}
              >
                <LinearGradient
                  colors={PROJECT_COLORS[color]}
                  style={{
                    borderRadius: 50,
                    padding: 20,
                    flex: 1,
                    width: 30,
                    height: 30,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-6 py-4">
          <CustomButton
            title={`Save ${mode === "edit" ? "Changes" : "Project"}`}
            onPress={handleSave}
            containerStyles="bg-black"
            textStyles="text-white"
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
