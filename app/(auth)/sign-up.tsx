import { Text, View, ScrollView, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useRouter, Link, Stack } from "expo-router";
import { useDB } from "@/hooks/useDB";
import { KeyboardShift } from "@/components/KeyboardShift";

type Form = {
  email: string;
  username: string;
  name: string;
  password: string;
};

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { createUser } = useDB();
  const router = useRouter();

  const handleSignUp = async () => {
    const { name, username, email, password } = form;
    if (!name || !username || !email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    const response = await createUser({ name, username, email, password });
    if (response.success) {
      router.push("/");
    }
    Alert.alert(response.message);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
                Sign Up
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
                onPress={handleSignUp}
                title="Sign Up"
                containerStyles="bg-black"
                textStyles="text-white"
              />

              <View className="flex-row items-center justify-center pt-5 gap-2">
                <Text className="text-gray-400 font-PoppinsRegular">
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => router.replace("/(auth)/sign-in")}
                  className="text-secondary underline"
                >
                  <Text className="text-secondary underline font-PoppinsRegular">
                    Sign In
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

export default SignUp;
