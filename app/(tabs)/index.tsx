import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

// Sample data
const RECIPES = [
  {
    id: 1,
    recipeName: "Creamy Mushroom Risotto",
    servings: "4",
    description: "A luxurious Italian risotto with wild mushrooms and parmesan",
    ingredients: [
      "2 cups Arborio rice",
      "8 cups vegetable stock",
      "1 lb mixed mushrooms",
      "1 cup parmesan cheese",
      "1/2 cup white wine",
      "2 shallots, diced",
      "4 cloves garlic, minced",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    procedure:
      "1. Sauté mushrooms until golden\n2. Cook shallots and garlic\n3. Add rice and toast\n4. Add wine and let absorb\n5. Gradually add stock\n6. Finish with parmesan and butter",
    estimatedTime: "45 mins",
    calories: "420",
    nutritionalInfo: {
      protein: "12g",
      carbs: "58g",
      fat: "18g",
      fiber: "4g",
    },
    vegan: false,
    categories: ["Italian", "Dinner", "Vegetarian"],
    createdAt: "2023-09-20T12:00:00Z",
  },
  {
    id: 2,
    recipeName: "Thai Green Curry Bowl",
    servings: "3",
    description: "Fragrant coconut curry with fresh vegetables and tofu",
    ingredients: [
      "1 block firm tofu",
      "2 cans coconut milk",
      "3 tbsp green curry paste",
      "2 cups mixed vegetables",
      "1 cup bamboo shoots",
      "Thai basil",
      "2 tbsp soy sauce",
      "1 tbsp palm sugar",
      "Jasmine rice",
    ],
    procedure:
      "1. Press and cube tofu\n2. Sauté curry paste\n3. Add coconut milk\n4. Simmer vegetables\n5. Add tofu\n6. Season and garnish",
    estimatedTime: "30 mins",
    calories: "380",
    nutritionalInfo: {
      protein: "15g",
      carbs: "42g",
      fat: "22g",
      fiber: "6g",
    },
    vegan: true,
    categories: ["Thai", "Curry", "Vegan"],
    createdAt: "2023-09-21T14:30:00Z",
  },
  {
    id: 3,
    recipeName: "Mediterranean Quinoa Bowl",
    servings: "4",
    description: "Fresh and healthy bowl with quinoa, vegetables, and feta",
    ingredients: [
      "2 cups quinoa",
      "4 cups water",
      "1 cucumber, diced",
      "2 cups cherry tomatoes",
      "1 red onion, sliced",
      "200g feta cheese",
      "Kalamata olives",
      "Extra virgin olive oil",
      "Lemon juice",
      "Fresh herbs",
    ],
    procedure:
      "1. Cook quinoa\n2. Chop vegetables\n3. Make dressing\n4. Combine ingredients\n5. Add feta and olives\n6. Drizzle with dressing",
    estimatedTime: "25 mins",
    calories: "340",
    nutritionalInfo: {
      protein: "14g",
      carbs: "48g",
      fat: "12g",
      fiber: "8g",
    },
    vegan: false,
    categories: ["Mediterranean", "Healthy", "Lunch"],
    createdAt: "2023-09-22T10:15:00Z",
  },
];

export default function Home() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { user } = useUser();

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <BackgroundWrapper>
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
              <TouchableOpacity
                style={styles.primaryButton}
                className="w-[350px]"
              >
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
      <ScrollView className="flex-1">
        <View className="px-4 pt-12 pb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            Hello, {user?.firstName || "Chef"}! 👋
          </Text>
          <Text className="text-gray-300 text-base mb-6">
            What are you cooking today?
          </Text>

          {/* Recipe Cards */}
          <View className="gap-y-6">
            {RECIPES.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                onPress={() => toggleExpand(recipe.id)}
                className="bg-gray-950/75 backdrop-blur-md  rounded-2xl overflow-hidden"
              >
                {/* Card Header */}
                <View className="p-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-white text-xl font-semibold mb-2">
                        {recipe.recipeName}
                      </Text>
                      <Text className="text-gray-300 text-sm mb-3">
                        {recipe.description}
                      </Text>
                    </View>
                    {recipe.vegan && (
                      <View className="bg-green-500/70 px-2 py-1 rounded-2xl">
                        <Text className="text-green-500 text-xs font-medium">
                          Vegan
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Quick Info */}
                  <View className="flex-row items-center gap-x-4">
                    <View className="flex-row items-center">
                      <Ionicons
                        name="time-outline"
                        className="text-blue-400"
                        size={16}
                        color="#9CA3AF"
                      />
                      <Text className="text-red-400 text-sm ml-1">
                        {recipe.estimatedTime}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name="flame-outline"
                        size={16}
                        color="#9CA3AF"
                      />
                      <Text className="text-red-400 text-sm ml-1">
                        {recipe.calories} cal
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name="people-outline"
                        size={16}
                        color="#9CA3AF"
                      />
                      <Text className="text-red-400 text-sm ml-1">
                        Serves {recipe.servings}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Expanded Content */}
                {expandedId === recipe.id && (
                  <View className="px-4 pb-4 bg-gray-950/70">
                    <View className="h-px my-3" />

                    {/* Categories */}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="mb-4"
                    >
                      {recipe.categories.map((category) => (
                        <View
                          key={category}
                          className="bg-white/70 px-3 py-1 rounded-full mr-2"
                        >
                          <Text className="text-white text-xs">{category}</Text>
                        </View>
                      ))}
                    </ScrollView>

                    {/* Nutritional Info */}
                    <View className="flex-row justify-between mb-4 bg-white/70 p-3 rounded-xl">
                      {Object.entries(recipe.nutritionalInfo).map(
                        ([key, value]) => (
                          <View key={key} className="items-center">
                            <Text className="text-white text-sm font-semibold">
                              {value}
                            </Text>
                            <Text className="text-gray-400 text-xs capitalize">
                              {key}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>

                    {/* Ingredients */}
                    <Text className="text-white text-lg font-semibold mb-2">
                      Ingredients
                    </Text>
                    <View className="mb-4">
                      {recipe.ingredients.map((ingredient, index) => (
                        <View
                          key={index}
                          className="flex-row items-center mb-2"
                        >
                          <View className="w-2 h-2 rounded-full bg-white/70 mr-2" />
                          <Text className="text-gray-300 text-sm">
                            {ingredient}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Procedure */}
                    <Text className="text-white text-lg font-semibold mb-2">
                      Procedure
                    </Text>
                    <Text className="text-gray-300 text-sm">
                      {recipe.procedure}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
