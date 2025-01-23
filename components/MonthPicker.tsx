import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

interface MonthPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  currentDate: Date;
  minYear?: number;
}

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

export default function MonthPicker({
  visible,
  onClose,
  onSelect,
  currentDate,
  minYear = 2020,
}: MonthPickerProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} className="flex-1 bg-black/20">
        <View className="mt-auto bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-xl font-PoppinsSemiBold">Select Date</Text>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View className="p-4">
            <Text className="text-sm text-gray-500 font-PoppinsRegular mb-2">
              YEAR
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {Array.from(
                { length: currentYear - minYear + 1 },
                (_, i) => currentYear - i
              ).map((year) => (
                <Pressable
                  key={year}
                  onPress={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    selectedYear === year ? "bg-black" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-PoppinsRegular ${
                      selectedYear === year ? "text-white" : "text-black"
                    }`}
                  >
                    {year}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text className="text-sm text-gray-500 font-PoppinsRegular mb-2">
              MONTH
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {MONTHS.map((month, index) => (
                <Pressable
                  key={month}
                  onPress={() => {
                    const newDate = new Date(selectedYear, index);
                    onSelect(newDate);
                    onClose();
                  }}
                  className={`px-4 py-2 rounded-full ${
                    currentDate.getMonth() === index &&
                    currentDate.getFullYear() === selectedYear
                      ? "bg-black"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-PoppinsRegular ${
                      currentDate.getMonth() === index &&
                      currentDate.getFullYear() === selectedYear
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {month}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
