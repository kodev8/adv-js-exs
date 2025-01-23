import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`w-full rounded-xl min-h-[58px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-PoppinsSemiBold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;