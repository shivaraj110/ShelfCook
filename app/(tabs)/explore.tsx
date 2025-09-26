import { View, TextInput, TouchableOpacity } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { Ionicons } from "@expo/vector-icons";

export default function Explore() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 p-4 bg-neutral-950/70">
        <View className="flex-row items-center bg-white/20 rounded-2xl px-4 py-3 mb-4 backdrop-blur-lg">
          <Ionicons name="search" size={24} color="white" />
          <TextInput
            className="flex-1 ml-3 text-white text-base"
            placeholder="Search..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />
          <TouchableOpacity>
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}
