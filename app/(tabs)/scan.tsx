import { View, Text } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";

export default function Scan() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl">Scan</Text>
      </View>
    </BackgroundWrapper>
  );
}