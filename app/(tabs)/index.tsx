import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SignOutButton } from "@/app/components/SigninButton";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";

export default function Page() {
  const { user } = useUser();

  return (
    <BackgroundWrapper>
      <StatusBar style="dark" />
      <View className="flex justify-center items-center h-screen">
        <SignedIn>
          <Text className="text-lg font-bold">
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.logo}>
                shelf<Text style={styles.logoAccent}>.cook</Text>
              </Text>
              <Text style={styles.tagline}>
                Cook delicious meals with what you have in your pantry
              </Text>
            </View>
            <View style={styles.buttons}>
              <Link href="./(auth)/login" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>
              </Link>
              <Link href="./(auth)/signup" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    Create a new account
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </SignedOut>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  logoAccent: {
    color: "#FFFF00",
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "80%",
  },
  buttons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
