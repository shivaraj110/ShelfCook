import { View, Text } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";

export default function Explore() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl">Explore</Text>
      </View>
    </BackgroundWrapper>
  );
}