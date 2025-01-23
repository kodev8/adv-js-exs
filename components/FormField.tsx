import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { titleCase } from "@/utils/validate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const FormField = ({ label, value, onChangeText }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View  className="gap-2 w-full justify-center mb-2  flex-1">
      <Text className="text-gray-400 font-PoppinsRegular">{titleCase(label)}</Text>
      <View className="border-2 rounded-md border-gray-500 w-full p-2 h-12 bg-gray-50  bg-black-100 rounded-2x focus:border-secondary items-center">
        <TextInput
          className="flex-1 w-full font-PoppinsRegular text-base text-left focus:outline-none focus:border-none"
          value={value}
          onChangeText={onChangeText}
          textAlign="left"
          secureTextEntry={label.toLowerCase() === "password" && !showPassword ? true : false}
        />
        {label === "password" && (
          <TouchableOpacity
            className="absolute right-2 top-2"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
