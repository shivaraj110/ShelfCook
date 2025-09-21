import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function TabLayout() {
  return (
    <>
      <SignedIn>
        <Tabs
          initialRouteName="index"
          screenOptions={{
            tabBarStyle: { height: 75 }, // Default height is ~59px, reducing by 15%
            tabBarIconStyle: { marginTop: 6 },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FF6666",
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => (
                <Ionicons name="compass" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              title: "Scan",
              tabBarIcon: ({ color }) => (
                <Ionicons name="scan" size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={24} color={color} />
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
