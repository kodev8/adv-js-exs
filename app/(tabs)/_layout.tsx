import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ProtectedLayout from "@/components/ProtectedLayout";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ProtectedLayout>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="projects"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.bullet" color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </ProtectedLayout>
  );
}
