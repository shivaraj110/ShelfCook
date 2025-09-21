import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Profile() {
  const { user } = useUser();

  const stats = [
    { label: "Recipes", value: "24" },
    { label: "Following", value: "210" },
    { label: "Followers", value: "1.2k" },
  ];

  const preferences = [
    { icon: "nutrition" as const, label: "Vegetarian" },
    { icon: "time" as const, label: "Quick Meals" },
    { icon: "restaurant" as const, label: "Italian Cuisine" },
  ];

  return (
    <BackgroundWrapper>
      <View className="flex-1">
        {/* Header Section */}
        <View className="px-4 pt-12 pb-6">
          <View className="items-center">
            <View className="rounded-full border-4 border-white/20 p-1">
              <Image
                source={{ uri: user?.imageUrl }}
                className="w-24 h-24 rounded-full"
              />
            </View>
            <View className="bg-white/40 rounded-xl px-4 py-2 border">
              <Text className="text-black font-semibold text-md">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-between mt-8 px-6">
            {stats.map((stat) => (
              <View key={stat.label} className="items-center">
                <Text className="text-gray-950/100 text-xl font-bold">
                  {stat.value}
                </Text>
                <Text className="text-gray-950/100 text-sm">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <ScrollView className="bg-gray-900/80 rounded-t-3xl flex-1 px-4 pt-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Cooking Preferences
          </Text>
          <View className="gap-y-[10px]">
            {preferences.map((pref) => (
              <View
                key={pref.label}
                className="flex-row items-center bg-gray/80 p-4 rounded-[20px]"
              >
                <View className="bg-white/10 p-2 rounded-full">
                  <Ionicons name={pref.icon} size={24} color="white" />
                </View>
                <Text className="text-white ml-3 flex-1">{pref.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </View>
            ))}
          </View>

          {/* Settings Buttons */}
          <View className="gap-y-[10px] mt-8">
            <TouchableOpacity className="flex-row items-center bg-gray/80 p-4 rounded-[20px]">
              <View className="bg-white/10 p-2 rounded-full">
                <Ionicons name="settings" size={24} color="white" />
              </View>
              <Text className="text-white ml-3 flex-1">Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-gray/80 p-4 rounded-[20px]">
              <View className="bg-white/10 p-2 rounded-full">
                <Ionicons name="help-circle" size={24} color="white" />
              </View>
              <Text className="text-white ml-3 flex-1">Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center my-8">
            <SignOutButton />
          </View>
        </ScrollView>
      </View>
    </BackgroundWrapper>
  );
}
