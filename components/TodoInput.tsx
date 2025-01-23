import { View, TextInput, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Task } from "../types/task";

interface TodoInputProps {
  onAdd: (task: Task) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd({
        id: Date.now().toString(),
        title: text.trim(),
        status: "todo",
        projectId: "",
        date: "today",
        description: "",
      });
      setText("");
    }
  };

  return (
    <View className="flex-row items-center gap-2 bg-white p-4 rounded-xl shadow-sm">
      <TextInput
        className="flex-1 text-gray-800 text-base font-PoppinsRegular"
        placeholder="Add a new task..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <Pressable
        onPress={handleAdd}
        className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center"
      >
        <MaterialCommunityIcons name="plus" size={20} color="white" />
      </Pressable>
    </View>
  );
}
