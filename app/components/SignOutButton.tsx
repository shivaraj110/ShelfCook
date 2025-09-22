import { useClerk } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("./home");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableOpacity
      className="p-2 px-5 py-3 mb-20 bg-[#AB5870] rounded-xl"
      onPress={handleSignOut}
    >
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};
