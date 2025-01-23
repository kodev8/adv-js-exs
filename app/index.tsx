import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link, Stack, router, useRootNavigationState } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDB } from "@/hooks/useDB";

export default function LandingScreen() {
  const { user } = useDB();
  const rootNavigation = useRootNavigationState();

  useEffect(() => {
    const redirect = async () => {
      if (!rootNavigation?.key) return;

      if (user) {
        router.replace("/(tabs)/projects");
      }
    };

    redirect();
  }, [user, rootNavigation?.key]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 px-6 py-4">
        <View className="py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-5xl font-PoppinsBold">Todos</Text>
          </View>

          <Text className="text-gray-500 font-PoppinsSemiBold mt-4 text-lg">
            Organize your tasks and projects in a simple way
          </Text>
        </View>

        <View className="gap-4 justify-center">
          <View className="w-full flex-row rounded-3xl p-4 items-center bg-gray-400">
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={32}
              color="white"
            />
            <Text className="text-white font-PoppinsSemiBold">Track Tasks</Text>
          </View>

          <View className="w-full flex-row rounded-3xl p-4 items-center bg-red-400  ">
            <MaterialCommunityIcons
              name="calendar-check"
              size={32}
              color="white"
            />
            <Text className="text-white font-PoppinsSemiBold">Daily Goals</Text>
          </View>

          <View className="w-full flex-row rounded-3xl p-4 items-center bg-blue-400">
            <MaterialCommunityIcons name="chart-line" size={32} color="white" />
            <Text className="text-white font-PoppinsSemiBold">Progress</Text>
          </View>

          <View className="w-full flex-row rounded-3xl p-4 items-center bg-green-400">
            <MaterialCommunityIcons name="bell-ring" size={32} color="white" />
            <Text className="text-white font-PoppinsSemiBold">Reminders</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.replace("/(auth)/sign-in");
            }}
            className="w-full flex-row rounded-3xl p-4 items-center bg-purple-400"
          >
            <MaterialCommunityIcons
              name="rocket-launch"
              size={32}
              color="white"
            />
            <Text className="text-white font-PoppinsSemiBold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
