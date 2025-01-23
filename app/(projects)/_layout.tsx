import ProtectedLayout from "@/components/ProtectedLayout";
import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <ProtectedLayout>
      <Stack>
        <Stack.Screen 
          name="[id]" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </ProtectedLayout>
  );
} 