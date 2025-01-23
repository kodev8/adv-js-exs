import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FABProps {
  onPress: () => void;
  className?: string;
}

export default function FAB({ onPress, className = "" }: FABProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg ${className}`}
    >
      <MaterialCommunityIcons name="plus" size={24} color="black" />
    </Pressable>
  );
} 