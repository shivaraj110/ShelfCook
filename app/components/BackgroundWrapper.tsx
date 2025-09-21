import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require("@/assets/images/illustrations/pancake.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFB5C5",
    opacity: 0.3,
  },
});
