import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useCameraContext } from "@/services/CameraContext";
import { getIngredients } from "@/services/getIngredients";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isCameraOpen, setIsCameraOpen } = useCameraContext();
  const cameraRef = useRef<any>(null);

  const handleProceed = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    try {
      const identified = await getIngredients(selectedImage);
      setIngredients(identified);
    } catch (error) {
      console.error("Error getting ingredients:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <View className="flex-1 bg-neutral-950/70 justify-center items-center p-6">
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
        <View className="flex-1 justify-center bg-neutral-950/70 items-center p-6">
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
        <View className="flex-1 p-10">
          <View className="flex-1 rounded-xl relative">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-full"
              resizeMode="contain"
              borderRadius={20}
            />
            
            {ingredients.length > 0 ? (
              <View className="absolute top-0 right-0 left-0 bg-black/50 backdrop-blur-sm p-6 rounded-t-2xl">
                <Text className="text-white font-medium text-lg mb-2">Identified Ingredients:</Text>
                <View className="flex-row flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <View key={index} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      <Text className="text-white">{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            <View className="flex-row space-x-4 bottom-[20%]">
              <TouchableOpacity
                onPress={handleClear}
                className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 py-5 rounded-2xl flex-row items-center justify-center shadow-lg"
                activeOpacity={0.7}
              >
                <View className="bg-white/20 rounded-xl p-2 mr-3">
                  <Ionicons name="close" size={24} color="white" />
                </View>
                <Text className="text-white text-lg font-medium">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleProceed}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-xl py-5 rounded-2xl flex-row items-center justify-center shadow-lg"
                activeOpacity={0.7}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" style={{ marginRight: 12 }} />
                ) : (
                  <View className="bg-white/20 rounded-xl p-2 mr-3">
                    <Ionicons name="arrow-forward" size={24} color="white" />
                  </View>
                )}
                <Text className="text-white text-lg font-medium">
                  {isLoading ? "Processing..." : "Proceed"}
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
            <View className="absolute bottom-10 w-full flex flex-row items-center justify-center gap-x-6">
              <TouchableOpacity
                onPress={() => setIsCameraOpen(false)}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg"
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-xl p-2 shadow-lg border-4 border-white/20"
                activeOpacity={0.7}
              >
                <View className="w-full h-full rounded-full bg-white shadow-inner" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg"
                activeOpacity={0.7}
              >
                <Ionicons name="camera-reverse" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center p-6 bg-neutral-950/70 ">
        <View className="w-full max-w-sm">
          <Text className="text-white text-4xl font-bold text-center mb-4">
            Scan Ingredients
          </Text>
          <Text className="text-white/60 text-center mb-12 text-lg">
            Take a photo or choose an image of ingredients to find matching
            recipes
          </Text>

          <View className="space-y-4">
            <TouchableOpacity
              onPress={openCamera}
              className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-xl w-full py-5 rounded-2xl flex-row items-center justify-center shadow-lg"
              activeOpacity={0.7}
            >
              <View className="bg-white/20 rounded-xl p-2 mr-3">
                <MaterialIcons name="camera-alt" size={24} color="white" />
              </View>
              <Text className="text-white text-lg font-medium">Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              className="bg-white/10 backdrop-blur-xl border border-white/20 w-full py-5 rounded-2xl flex-row items-center justify-center shadow-lg"
              activeOpacity={0.7}
            >
              <View className="bg-white/10 rounded-xl p-2 mr-3">
                <MaterialIcons name="photo-library" size={24} color="white" />
              </View>
              <Text className="text-white text-lg font-medium">
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
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
