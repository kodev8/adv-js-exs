import { View, Text, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Task } from "@/types/task";
import TaskItem from "@/components/TaskItem";
import TaskModal from "@/components/TaskModal";
import FAB from "@/components/FAB";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MonthPicker from "@/components/MonthPicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDB } from "@/hooks/useDB";
import { Dimensions } from "react-native";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const scrollToDate = (
  date: Date,
  scrollViewRef: React.RefObject<ScrollView>
) => {
  const dayWidth = 48;
  const dayGap = 8;
  const screenWidth = Dimensions.get("window").width;
  const datePosition = (date.getDate() - 1) * (dayWidth + dayGap);
  const centerOffset = (screenWidth - dayWidth) / 2;

  setTimeout(() => {
    scrollViewRef.current?.scrollTo({
      x: Math.max(0, datePosition - centerOffset),
      animated: true,
    });
  }, 100);
};

export default function Tasks() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const { tasks, updateTask, createTask, setTasks } = useDB();
  const scrollViewRef = useRef<ScrollView>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  // Update the getFormattedDate helper to normalize dates
  const getFormattedDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  };

  // Update the filtering logic
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    const selectedDateCopy = new Date(selectedDate);
    selectedDateCopy.setHours(0, 0, 0, 0);

    return getFormattedDate(taskDate) === getFormattedDate(selectedDateCopy);
  });

  // Update the calendar day selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    scrollToDate(selectedDate, scrollViewRef);
  }, [selectedDate]);

  return (
    <SafeAreaView className="flex-1 bg-blacl">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />

          <View className="px-6">
            <View className="flex-row justify-between items-center mb-6">
              <Pressable
                className="flex-row items-center gap-2"
                onPress={() => setMonthPickerVisible(true)}
              >
                <Text className="text-white text-xl font-PoppinsSemiBold">
                  {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="white"
                />
              </Pressable>

              <FAB onPress={() => setModalVisible(true)} />
            </View>

            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <View className="flex-row gap-2">
                {getDaysInMonth(selectedDate).map((date) => (
                  <Pressable
                    key={date.getDate()}
                    onPress={() => handleDateSelect(date)}
                    className={`w-12 h-16 rounded-full ${
                      getFormattedDate(date) === getFormattedDate(selectedDate)
                        ? "bg-white"
                        : "bg-zinc-800"
                    } items-center justify-center`}
                  >
                    <Text className="text-xs text-gray-400 mb-1 font-PoppinsRegular">
                      {
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                          date.getDay()
                        ]
                      }
                    </Text>
                    <Text
                      className={`text-base font-PoppinsSemiBold ${
                        getFormattedDate(date) ===
                        getFormattedDate(selectedDate)
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {date.getDate()}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <ScrollView className="flex-1 px-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <View key={task.id} className="mb-2">
                  <TaskItem
                    task={task}
                    onPress={(updatedTask) => {
                      const statusMap: Record<string, Task["status"]> = {
                        todo: "inProgress",
                        inProgress: "done",
                        done: "todo",
                      };
                      const newTask = {
                        ...updatedTask,
                        status: statusMap[updatedTask.status],
                      };
                      updateTask(newTask);
                    }}
                  />
                </View>
              ))
            ) : (
              <Text className="text-gray-400 text-center mt-8 font-PoppinsRegular">
                No tasks for this date
              </Text>
            )}
          </ScrollView>

          <TaskModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={createTask}
            mode="create"
            projectId=""
          />

          <MonthPicker
            visible={monthPickerVisible}
            onClose={() => setMonthPickerVisible(false)}
            onSelect={(date) => setSelectedDate(date)}
            currentDate={selectedDate}
            minYear={2020}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
