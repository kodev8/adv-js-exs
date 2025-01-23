import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { Task } from "../types/task";
import MonthPicker from "./MonthPicker";
import { useDB } from "@/hooks/useDB";
import CustomButton from "./CustomButton";
import { KeyboardShift } from "./KeyboardShift";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  mode: "edit" | "create";
  projectId?: string;
}

export default function TaskModal({
  visible,
  onClose,
  onSave,
  task,
  mode,
  projectId,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [selectedDate, setSelectedDate] = useState(
    task ? new Date(task.date) : new Date()
  );
  const [selectedProject, setSelectedProject] = useState(
    task?.projectId || projectId || ""
  );
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const { projects } = useDB();
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToDate = (
    date: Date,
    scrollViewRef: React.RefObject<ScrollView>
  ) => {
    const dayWidth = 48; // width of day item
    const dayGap = 8; // gap between items
    const screenWidth = Dimensions.get("window").width;
    const datePosition = (date.getDate() - 1) * (dayWidth + dayGap);
    const centerOffset = screenWidth - dayWidth + dayGap;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: Math.max(0, datePosition - centerOffset),
        animated: true,
      });
    }, 100);
  };

  useEffect(() => {
    if (visible) {
      scrollToDate(selectedDate, scrollViewRef);
    }
  }, [visible, selectedDate]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: task?.id || Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        status: task?.status || "todo",
        projectId: selectedProject,
        date: selectedDate.toISOString().split("T")[0],
      });
      if (mode === "create") {
        setTitle("");
        setDescription("");
        setSelectedDate(new Date());
      }
    }
  };

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  const getFormattedDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-4 border-b border-gray-100">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-PoppinsSemiBold">
              {mode === "edit" ? "Edit Task" : "New Task"}
            </Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <Pressable
            className="flex-row items-center gap-2 mt-4"
            onPress={() => setMonthPickerVisible(true)}
          >
            <MaterialCommunityIcons name="calendar" size={24} color="black" />
            <Text className="text-base font-PoppinsRegular">
              {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
          </Pressable>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
          >
            <View className="flex-row gap-2">
              {getDaysInMonth(selectedDate).map((date) => (
                <Pressable
                  key={date.getDate()}
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(date.getDate());
                    setSelectedDate(newDate);
                  }}
                  className={`w-12 h-16 rounded-full ${
                    getFormattedDate(date) === getFormattedDate(selectedDate)
                      ? "bg-black"
                      : "bg-gray-100"
                  } items-center justify-center`}
                >
                  <Text className="text-xs text-gray-400 mb-1">
                    {
                      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                        date.getDay()
                      ]
                    }
                  </Text>
                  <Text
                    className={`text-base font-PoppinsSemiBold ${
                      getFormattedDate(date) === getFormattedDate(selectedDate)
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {date.getDate()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="px-6 py-4 flex">
          <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2">
            PROJECTS
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2"
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedProject("");
              }}
              className="rounded-full bg-gray-200 p-4"
            >
              <MaterialCommunityIcons name="close" size={16} color="black" />
            </TouchableOpacity>

            {projects?.map((project) => (
              <TouchableOpacity
                key={project.id}
                className={`rounded-full px-4 py-2 mx-2`}
                style={{
                  backgroundColor:
                    selectedProject == project.id ? project.bg : "white",
                }}
                onPress={() => setSelectedProject(project.id)}
              >
                <Text
                  className="font-PoppinsRegular"
                  style={{
                    color:
                      project.bg == "black" || project.bg == "gray"
                        ? "white"
                        : "black",
                  }}
                >
                  {project.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <KeyboardShift>
          <View className="px-6 flex-1">
            <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2">
              TITLE
            </Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-xl font-PoppinsRegular mb-4"
              value={title}
              onChangeText={setTitle}
              placeholder="Task title"
            />

            <Text className="text-xs text-gray-500 font-PoppinsRegular mb-2">
              DESCRIPTION
            </Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-xl font-PoppinsRegular"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholder="Add a description..."
            />
          </View>
        </KeyboardShift>

        <View className="px-6 py-4">
          <CustomButton
            title={mode === "edit" ? "Save Changes" : "Create Task"}
            containerStyles="bg-black"
            textStyles="text-white"
            onPress={handleSave}
          />
        </View>

        <MonthPicker
          visible={monthPickerVisible}
          onClose={() => setMonthPickerVisible(false)}
          onSelect={(date) => setSelectedDate(date)}
          currentDate={selectedDate}
          minYear={2020}
        />
      </SafeAreaView>
    </Modal>
  );
}
