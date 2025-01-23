import { Text, View, ScrollView, Alert, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useRouter, Link, Stack } from "expo-router";
import { useDB } from "@/hooks/useDB";
import { KeyboardShift } from "@/components/KeyboardShift";

type Form = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });
  const { setUser } = useDB();
  const router = useRouter();
  const { signIn } = useDB();
  const handleSignIn = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    const response = await signIn(email, password);
    if (response?.success) {
      router.replace("/(tabs)/projects");
    } else {
      Alert.alert(response?.message || "Invalid email or password");
    }
  };
  return (
    <SafeAreaView className="flex-1 flex bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardShift>
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 justify-center">
            <Pressable onPress={() => router.replace("/")}>
              <Text className="font-bold text-4xl font-PoppinsSemiBold text-center mb-12">
                Todos
              </Text>
            </Pressable>

            <View className="w-full px-4">
              <Text className="text-3xl font-PoppinsSemiBold mb-6">
                Sign In
              </Text>

              {Object.keys(form).map((field: string) => (
                <FormField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field as keyof Form]}
                  onChangeText={(text: string) =>
                    setForm({ ...form, [field]: text })
                  }
                />
              ))}

              <CustomButton
                onPress={handleSignIn}
                title="Sign In"
                containerStyles="bg-black"
                textStyles="text-white"
              />

              <View className="flex-row items-center justify-center pt-5 gap-2">
                <Text className="text-gray-400 font-PoppinsRegular">
                  Don't have an account?
                </Text>
                <Pressable
                  onPress={() => router.replace("/(auth)/sign-up")}
                  className="text-secondary underline"
                >
                  <Text className="text-secondary underline font-PoppinsRegular">
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default SignIn;
