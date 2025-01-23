import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ContextMenu({
  visible,
  onClose,
  onEdit,
  onDelete,
}: ContextMenuProps) {
  if (!visible) return null;

  return (
    <View className="absolute right-0 top-8 bg-white rounded-xl shadow-lg w-48 z-50">
      <Pressable
        onPress={() => {
          onEdit();
          onClose();
        }}
        className="flex-row items-center p-4 gap-2"
      >
        <MaterialCommunityIcons name="pencil" size={20} color="black" />
        <Text className="font-PoppinsRegular">Edit</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          onDelete();
          onClose();
        }}
        className="flex-row items-center p-4 gap-2 border-t border-gray-100"
      >
        <MaterialCommunityIcons name="trash-can" size={20} color="red" />
        <Text className="font-PoppinsRegular text-red-500">Delete</Text>
      </Pressable>
    </View>
  );
}
