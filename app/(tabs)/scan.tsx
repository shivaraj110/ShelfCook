import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useCameraContext } from "@/services/CameraContext";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isCameraOpen, setIsCameraOpen } = useCameraContext();
  const cameraRef = useRef<any>(null);

  const handleClear = () => {
    setSelectedImage(null);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setSelectedImage(photo.uri);
        setIsCameraOpen(false);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  if (!permission) {
    return (
      <BackgroundWrapper>
        <View className="flex-1 justify-center items-center p-6">
          <MaterialIcons name="camera-alt" size={64} color="white" />
          <Text className="text-white text-xl mt-4 text-center">
            Requesting camera permission...
          </Text>
        </View>
      </BackgroundWrapper>
    );
  }

  if (!permission.granted) {
    return (
      <BackgroundWrapper>
        <View className="flex-1 justify-center items-center p-6">
          <MaterialIcons name="no-photography" size={64} color="white" />
          <Text className="text-white text-xl mt-4 text-center">
            We need your permission to use the camera
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-blue-500/80 backdrop-blur-md px-6 py-3 rounded-2xl mt-6 flex-row items-center"
          >
            <MaterialIcons name="camera-alt" size={24} color="white" />
            <Text className="text-white text-lg ml-2">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </BackgroundWrapper>
    );
  }

  if (selectedImage) {
    return (
      <BackgroundWrapper>
        <View className="flex-1">
          <View className="flex-1 relative">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 backdrop-blur-lg">
              <TouchableOpacity
                onPress={handleClear}
                className="bg-blue-500/80 backdrop-blur-md w-full py-4 rounded-2xl flex-row justify-center items-center"
              >
                <Ionicons name="camera-reverse" size={24} color="white" />
                <Text className="text-white text-lg ml-2">
                  Choose Another Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BackgroundWrapper>
    );
  }

  if (isCameraOpen) {
    return (
      <BackgroundWrapper>
        <View style={styles.container}>
          <CameraView ref={cameraRef} facing="back" style={styles.camera}>
            <View className="absolute bottom-10 w-full flex flex-row items-center justify-center gap-x-8">
              <TouchableOpacity
                onPress={() => setIsCameraOpen(false)}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
              >
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg p-2"
              >
                <View className="w-full h-full rounded-full bg-white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
              >
                <Ionicons name="camera-reverse" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-sm space-y-6">
          <Text className="text-white text-3xl font-bold text-center mb-8">
            Scan Ingredients
          </Text>
          <TouchableOpacity
            onPress={openCamera}
            className="bg-blue-500/80 backdrop-blur-md w-full py-4 rounded-2xl flex-row items-center justify-center"
          >
            <MaterialIcons name="camera-alt" size={24} color="white" />
            <Text className="text-white text-lg ml-2">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            className="bg-blue-500/80 backdrop-blur-md w-full py-4 rounded-2xl flex-row items-center justify-center"
          >
            <MaterialIcons name="photo-library" size={24} color="white" />
            <Text className="text-white text-lg ml-2">Choose from Gallery</Text>
          </TouchableOpacity>
          <Text className="text-white/60 text-center mt-4">
            Take a photo or choose an image of ingredients to find matching
            recipes
          </Text>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});