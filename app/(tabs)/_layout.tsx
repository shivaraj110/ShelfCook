import { Stack, Tabs, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useCameraContext } from "@/services/CameraContext";
import { StatusBar, View } from "react-native";
import { useEffect } from "react";

export default function TabLayout() {
  const segments = useSegments();
  const { isCameraOpen, setIsCameraOpen } = useCameraContext();
  
  // Close camera when navigating away from scan page
  useEffect(() => {
    const currentPage = segments[segments.length - 1];
    if (currentPage !== 'scan' && isCameraOpen) {
      setIsCameraOpen(false);
    }
  }, [segments, isCameraOpen, setIsCameraOpen]);
  return (
    <>
      <SignedIn>
        <StatusBar backgroundColor={"#E74C3C"} />
        <Tabs
          initialRouteName="index"
          screenOptions={{
            tabBarStyle: {
              display: isCameraOpen ? "none" : "flex",
              height: 90,
              backgroundColor: "#282828",
              borderTopWidth: 0,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarItemStyle: {
              paddingVertical: 16,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FF6666",
            tabBarInactiveTintColor: "#808080",
            headerShown: false,

            tabBarBackground: () => (
              <View className="absolute inset-0 bg-neutral-900/95 "></View>
            ),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              title: "Scan",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "scan-circle" : "scan-circle-outline"}
                  size={32}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false }} />
      </SignedOut>
    </>
  );
}
