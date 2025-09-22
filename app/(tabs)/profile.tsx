import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Profile() {
  const { user } = useUser();

  const stats = [
    { label: "Recipes", value: "24", icon: "book-outline" as const },
    { label: "Following", value: "210", icon: "people-outline" as const },
    { label: "Followers", value: "1.2k", icon: "heart-outline" as const },
  ];

  const sections = [
    {
      title: "Dietary Preferences",
      items: [
        { icon: "leaf" as const, label: "Diet Type", value: "Vegetarian" },
        {
          icon: "warning" as const,
          label: "Allergies",
          value: "Nuts, Shellfish",
        },
        {
          icon: "nutrition" as const,
          label: "Meal Prep",
          value: "Weekly Plan",
        },
      ],
    },
    {
      title: "Cooking Preferences",
      items: [
        { icon: "timer" as const, label: "Cook Time", value: "< 30 mins" },
        {
          icon: "restaurant" as const,
          label: "Cuisine",
          value: "Italian, Thai",
        },
        { icon: "flame" as const, label: "Skill Level", value: "Intermediate" },
      ],
    },
  ];

  const quickLinks = [
    { icon: "bookmark" as const, label: "Saved", count: "28" },
    { icon: "create" as const, label: "My Recipes", count: "12" },
    { icon: "star" as const, label: "Favorites", count: "45" },
    { icon: "time" as const, label: "Recent", count: "8" },
  ];

  return (
    <BackgroundWrapper>
      <ScrollView
        className="flex-1 bg-gray-950/90"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="pt-12 px-4">
          <View className="flex-row items-center">
            <View className="relative">
              <View className="rounded-full border-2 border-white/10 p-0.5">
                <Image
                  source={{ uri: user?.imageUrl }}
                  className="w-20 h-20 rounded-full"
                />
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white/10 p-1.5 rounded-full backdrop-blur-md"
                activeOpacity={0.7}
              >
                <Ionicons name="camera" size={14} color="white" />
              </TouchableOpacity>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-white text-xl font-semibold">
                {user?.fullName}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
              <TouchableOpacity
                className="mt-3 flex-row items-center bg-white/10 self-start px-4 py-1.5 rounded-full"
                activeOpacity={0.7}
              >
                <Text className="text-white text-sm">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Links */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-6 -mx-4 px-4"
          >
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={link.label}
                className={`bg-white/5 backdrop-blur-md rounded-2xl p-3 w-24 items-center ${
                  index !== quickLinks.length - 1 ? "mr-3" : ""
                }`}
                activeOpacity={0.7}
              >
                <View className="bg-white/10 p-2 rounded-full mb-2">
                  <Ionicons name={link.icon} size={20} color="white" />
                </View>
                <Text className="text-white text-xs mb-1">{link.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Stats */}
          <View className="flex-row justify-between mt-6 bg-white/5 backdrop-blur-md rounded-2xl p-4">
            {stats.map((stat) => (
              <View key={stat.label} className="items-center px-4">
                <View className="bg-white/10 p-2 rounded-full mb-2">
                  <Ionicons name={stat.icon} size={20} color="white" />
                </View>
                <Text className="text-white text-lg font-semibold">
                  {stat.value}
                </Text>
                <Text className="text-gray-400 text-xs">{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Preferences Sections */}
          {sections.map((section) => (
            <View key={section.title} className="mt-6">
              <Text className="text-white text-lg font-semibold mb-3 px-1">
                {section.title}
              </Text>
              <View className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    className={`flex-row items-center p-4 ${
                      index !== section.items.length - 1
                        ? "border-b border-white/5"
                        : ""
                    }`}
                    activeOpacity={0.7}
                  >
                    <View className="bg-white/10 p-2 rounded-full">
                      <Ionicons name={item.icon} size={20} color="white" />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-white">{item.label}</Text>
                      <Text className="text-gray-400 text-sm mt-0.5">
                        {item.value}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Sign Out Button */}
          <View className="items-center my-8">
            <SignOutButton />
          </View>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}
