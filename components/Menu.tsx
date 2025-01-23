import { View, Text, Pressable, Modal, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Menu({
  visible,
  onClose,
  onEdit,
  onDelete,
}: MenuProps) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <SafeAreaView className="flex-1 bg-black/20">
        <Pressable onPress={onClose} className="flex-1 bg-black/20">
          <View className="absolute right-4 top-4 bg-white rounded-xl shadow-lg w-48">
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
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}
