import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDB } from "@/hooks/useDB";
import CustomButton from "@/components/CustomButton";

export default function Account() {
  const { user, setUser } = useDB();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
  });
  const { updateUser } = useDB();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const response = await updateUser({
        ...user,
        ...formData,
      });

      if (response.success) {
        setUser(response.data);
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Account",
          headerShadowVisible: false,
        }}
      />

      <ScrollView className="px-6 ">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
            <MaterialCommunityIcons name="account" size={48} color="gray" />
          </View>
          {!isEditing ? (
            <Text className="text-2xl font-PoppinsSemiBold">{user.name}</Text>
          ) : (
            <TextInput
              className="text-2xl font-PoppinsSemiBold text-center"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          )}
          {!isEditing && (
            <Text className="text-gray-500 font-PoppinsRegular">
              @{user.username}
            </Text>
          )}
        </View>

        <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <Text className="text-xs text-gray-500 font-PoppinsRegular mb-4">
            PROFILE INFORMATION
          </Text>

          <View className="gap-4">
            <View>
              <Text className="text-gray-500 font-PoppinsRegular mb-1">
                Name
              </Text>
              <TextInput
                className={`p-2 rounded-lg font-PoppinsRegular ${
                  isEditing ? "bg-gray-100" : ""
                }`}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                editable={isEditing}
              />
            </View>

            <View>
              <Text className="text-gray-500 font-PoppinsRegular mb-1">
                Username
              </Text>
              <TextInput
                className={`p-2 rounded-lg font-PoppinsRegular ${
                  isEditing ? "bg-gray-100" : ""
                }`}
                value={formData.username}
                onChangeText={(text) =>
                  setFormData({ ...formData, username: text })
                }
                editable={isEditing}
              />
            </View>

            <View>
              <Text className="text-gray-500 font-PoppinsRegular mb-1">
                Email
              </Text>
              <Text className="p-2 font-PoppinsRegular text-gray-800">
                {user.email}
              </Text>
            </View>
          </View>
        </View>

        {isEditing ? (
          <View className="gap-4">
            <CustomButton
              onPress={() => {
                setIsEditing(false);
                setFormData({
                  name: user.name,
                  username: user.username,
                });
              }}
              title="Cancel"
              containerStyles="bg-gray-100"
              textStyles="text-gray-800"
            />
            <CustomButton
              onPress={handleUpdate}
              title="Save Changes"
              containerStyles="bg-black"
              textStyles="text-white"
            />
          </View>
        ) : (
          <View className="gap-4">
            <CustomButton
              onPress={() => setIsEditing(true)}
              title="Edit Profile"
              containerStyles="bg-black"
              textStyles="text-white"
            />

            <CustomButton
              onPress={() => setUser(null)}
              containerStyles="bg-red-500"
              textStyles="text-white"
              title="Logout"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
