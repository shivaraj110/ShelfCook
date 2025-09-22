import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BackgroundWrapper } from "@/app/components/BackgroundWrapper";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const mealTypes = [
  { icon: "sunny-outline" as const, label: "Breakfast" },
  { icon: "restaurant-outline" as const, label: "Lunch" },
  { icon: "moon-outline" as const, label: "Dinner" },
  { icon: "cafe-outline" as const, label: "Snacks" },
];

interface Recipe {
  id: number;
  recipeName: string;
  servings: string;
  description: string;
  ingredients: string[];
  procedure: string;
  estimatedTime: string;
  calories: string;
  nutritionalInfo: {
    [key: string]: string;
  };
  vegan: boolean;
  categories: string[];
  createdAt?: string;
}

// Use your existing RECIPES data here
const RECIPES: Recipe[] = [
  {
    id: 1,
    recipeName: "Sada Dosa",
    servings: "15",
    description:
      "A savory rice crepe, also known as dosa, made with parboiled rice, urad dhal, and fenugreek seeds.",
    ingredients: [
      "100g/3½oz parboiled rice",
      "75g/2½oz urad dhal*",
      "½ tsp fenugreek seeds",
      "½ tsp bicarbonate of soda",
      "Salt to taste",
      "125g/4½oz yoghurt, whipped",
      "60ml/2fl oz refined vegetable oil",
    ],
    procedure:
      "1. Soak the rice and the dhal together with the fenugreek seeds for 7-8 hours. 2. Drain and grind the mixture to a grainy paste. 3. Add bicarbonate of soda and salt. Mix well. 4. Set aside to ferment for 8-10 hours. 5. Add the yoghurt to make the batter. This batter should be thick enough to coat a spoon. Add a little water if needed. Set aside. 6. Grease and heat a flat pan. Spread a spoonful of the batter over it to make a thin crêpe. Pour 1 tsp oil on top. Cook until crisp. Repeat for the rest of the batter and serve hot.",
    estimatedTime: "20 minutes ",
    calories: " 80-100",
    nutritionalInfo: {
      protein: "2g",
      carbohydrates: "12g",
      fat: "3g",
    },
    vegan: false,
    categories: ["Snacks", "Breakfast"],
  },
  {
    id: 2,
    recipeName: "Potato Samosa",
    servings: "20",
    description:
      "A classic Indian snack made with a flaky pastry filled with spiced potatoes, ginger, chilies, and coriander.",
    ingredients: [
      "175g/6oz plain white flour",
      "Pinch of salt",
      "5 tbsp refined vegetable oil plus extra for deep frying",
      "100ml/3½fl oz water",
      "1cm/½in root ginger, grated",
      "2 green chillies, finely chopped",
      "2 garlic cloves, finely chopped",
      "½ tsp ground coriander",
      "1 large onion, finely chopped",
      "2 large potatoes, boiled and mashed",
      "1 tbsp coriander leaves, finely chopped",
      "1 tbsp lemon juice",
      "½ tsp turmeric",
      "1 tsp chilli powder",
      "½ tsp garam masala",
      "Salt to taste",
    ],
    procedure:
      "1. Mix the flour with the salt, 2 tbsp oil and water. Knead into a pliable dough. 2. Cover with a moist cloth and set aside for 15-20 minutes. 3. Knead the dough again. Cover with a moist cloth and set aside. 4. For the filling, heat 3 tbsp oil in a frying pan. Add the ginger, green chillies, garlic and ground coriander. Fry for a minute on a medium heat, stirring continuously. 5. Add the onion and fry till brown. 6. Add the potatoes, coriander leaves, lemon juice, turmeric, chilli powder, garam masala and salt. Mix thoroughly. 7. Cook on a low heat for 4 minutes, stirring occasionally. Set aside. 8. To make the samosas, divide the dough into 10 balls. Roll out into discs of 12cm/5in diameter. Cut each disc into 2 half-moons. 9. Run a moist finger along the diameter of a half-moon. Bring the ends together to make a cone. 10. Place a tbsp of the filling in the cone and seal by pressing the edges together. Repeat for all the half-moons. 11. Heat the oil in a frying pan. Deep fry the samosas, five at a time, over a low heat till light brown. Drain on absorbent paper. 12. Serve hot with mint chutney (see here).",
    estimatedTime: "60 minutes",
    calories: " 180-220",
    nutritionalInfo: {
      protein: "3g",
      carbohydrates: "20g",
      fat: "10g",
    },
    vegan: true,
    categories: ["Appetizers", "Snacks"],
  },
  {
    id: 3,
    recipeName: "Hot Kachori",
    servings: " 15",
    description:
      "A fried dumpling filled with lentil filling, seasoned with coriander, fennel, cumin, and other spices.",
    ingredients: [
      "250g/9oz plain white flour plus 1 tbsp for the patching",
      "5 tbsp refined vegetable oil plus extra for deep frying",
      "Salt to taste",
      "1.4 litres/2½ pints water plus 1 tbsp for patching",
      "300g/10oz mung dhal*, soaked for 30 minutes",
      "½ tsp ground coriander",
      "½ tsp ground fennel",
      "½ tsp cumin seeds",
      "½ tsp mustard seeds",
      "2-3 pinches of asafoetida",
      "1 tsp garam masala",
      "1 tsp chilli powder",
    ],
    procedure:
      "1. Mix 250g/9oz flour with 3 tbsp oil, salt and 100ml/3½fl oz of the water. Knead into a soft, pliable dough. Set aside for 30 minutes. 2. To make the filling, cook the dhal with the remaining water in a saucepan on a medium heat for 45 minutes. Drain and set aside. 3. Heat 2 tbsp oil in a saucepan. When it begins to smoke, add the ground coriander, fennel, cumin seeds, mustard seeds, asafoetida, garam masala, chilli powder and salt. Let them splutter for 30 seconds. 4. Add the cooked dhal. Mix well and fry for 2-3 minutes, stirring continuously. 5. Cool the dhal mixture and divide into 15 lemon-sized balls. Set aside. 6. Mix 1 tbsp flour with 1 tbsp water to make a paste for patching. Set aside. 7. Divide the dough into 15 balls. Roll out into discs of 12cm/5in diameter. 8. Place 1 ball of the filling in the centre of a disc. Seal like a pouch. Flatten slightly by pressing it between the palms. Repeat for the remaining discs. 9. Heat the oil in a saucepan until it starts smoking. Deep fry the discs till golden brown on the underside. Flip and repeat. 10. If a kachori tears while frying, seal it with the patching paste. 11. Drain on absorbent paper. Serve hot with mint chutney (see here).",
    estimatedTime: "90 minutes",
    calories: " 200-250",
    nutritionalInfo: {
      protein: "8g",
      carbohydrates: "30g",
      fat: "8g",
    },
    vegan: true,
    categories: ["Appetizers", "Snacks"],
  },
  {
    id: 4,
    recipeName: "Khandvi",
    servings: " 10-15",
    description:
      "A Gujurati snack made with besan (gram flour) and yogurt, rolled up and seasoned with mustard seeds, coconut, and coriander.",
    ingredients: [
      "60g/2oz besan*",
      "60g/2oz yoghurt",
      "120ml/4fl oz water",
      "1 tsp turmeric",
      "Salt to taste",
      "5 tbsp refined vegetable oil",
      "1 tbsp fresh coconut, grated",
      "1 tbsp coriander leaves, finely chopped",
      "½ tsp mustard seeds",
      "2 pinches of asafoetida",
      "8 curry leaves",
      "2 green chillies, finely chopped",
      "1 tsp sesame seeds",
    ],
    procedure:
      "1. Mix the besan, yoghurt, water, turmeric and salt together. 2. Heat 4 tbsp oil in a frying pan. Add the besan mixture and cook, stirring continuously to make sure no lumps are formed. 3. Cook till the mixture leaves the sides of the pan. Set aside. 4. Grease two 15 × 35cm/6 × 14in non-stick baking trays. Pour in the besan mixture and smooth flat with a palette knife. Allow to set for 10 minutes. 5. Cut the mixture into 5cm/2in wide strips. Carefully roll up each strip. 6. Place the rolls in a serving dish. Sprinkle the grated coconut and coriander leaves on top. Set aside. 7. Heat 1 tbsp oil in a small saucepan. Add the mustard seeds, asafoetida, curry leaves, green chillies and sesame seeds. Let them splutter for 15 seconds. 8. Pour this immediately over the besan rolls. Serve hot or at room temperature.",
    estimatedTime: "30 minutes",
    calories: " 70-90 per roll",
    nutritionalInfo: {
      protein: "2g",
      carbohydrates: "8g",
      fat: "4g",
    },
    vegan: false,
    categories: ["Appetizers", "Snacks"],
  },
  {
    id: 5,
    recipeName: "Makkai Squares",
    servings: " 12",
    description:
      "Corn squares filled with a mixture of ground corn kernels and mashed peas, seasoned with green chilies and coriander.",
    ingredients: [
      "2 tsp ghee",
      "100g/3½oz corn kernels, ground",
      "Salt to taste",
      "125g/4½oz boiled peas",
      "3 tbsp refined vegetable oil",
      "8 green chillies, finely chopped",
      "½ tsp cumin seeds",
      "½ tsp mustard seeds",
      "½ tsp garlic paste",
      "½ tbsp ground coriander",
      "½ tbsp ground cumin",
      "175g/6oz maize flour",
      "175g/6oz wholemeal flour",
      "150ml/5fl oz water",
    ],
    procedure:
      "1. Heat the ghee in a saucepan. When it begins to smoke, fry the corn for 3 minutes. Set aside. 2. Add salt to the boiled peas. Mash the peas well. Set aside. 3. Heat 2 tbsp oil in a frying pan. Add the green chillies, cumin and mustard seeds. Let them splutter for 15 seconds. 4. Add the fried corn, mashed peas, garlic paste, ground coriander and ground cumin. Mix well. Remove from the heat and set aside. 5. Mix both the flours together. Add salt and 1 tbsp oil. Add the water and knead into a soft dough. 6. Roll out 24 square shapes, each square 10x10cm/4x4in in size. 7. Place the corn and peas mixture in the centre of a square and cover with another square. Gently press the edges of the square to seal. 8. Repeat for the rest of the squares. 9. Grease and heat a frying pan. Roast the squares on the pan till golden brown. 10. Serve hot with ketchup.",
    estimatedTime: "60 minutes",
    calories: " 120-150 per square",
    nutritionalInfo: {
      protein: "4g",
      carbohydrates: "20g",
      fat: "4g",
    },
    vegan: false,
    categories: ["Snacks", "Vegetables"],
  },
  {
    id: 6,
    recipeName: "Dhal Pakwan",
    servings: "Serves 4",
    description:
      "Crispy fried bread served with a flavorful chana dhal (split chickpea lentils) seasoned with cumin, turmeric, amchoor, and coriander.",
    ingredients: [
      "600g/1lb 5oz chana dhal*",
      "3 tbsp refined vegetable oil",
      "1 tsp cumin seeds",
      "750ml/1¼ pints water",
      "Salt to taste",
      "½ tsp turmeric",
      "½ tsp amchoor*",
      "10g/¼oz coriander leaves, finely chopped",
      "250g/9oz plain white flour",
      "½ tsp cumin seeds",
      "Salt to taste",
      "Refined vegetable oil for deep frying",
    ],
    procedure:
      "1. Soak the chana dhal for 4 hours. Drain and set aside. 2. Heat the oil in a saucepan. Add the cumin seeds. Let them splutter for 15 seconds. 3. Add the soaked dhal, water, salt and turmeric. Simmer for 30 minutes. 4. Transfer to a serving dish. Sprinkle with the amchoor and coriander leaves. Set aside. 5. Knead all the pakwan ingredients, except the oil, with enough water to make a stiff dough. 6. Divide into walnut-sized balls. Roll out into thick discs, 10cm/4in in diameter. Pierce all over with a fork. 7. Heat the oil in a frying pan. Deep fry the discs till golden. Drain on absorbent paper. 8. Serve the pakwans with the hot dhal.",
    estimatedTime: "90 minutes (plus soaking time)",
    calories: " 350-400 per serving",
    nutritionalInfo: {
      protein: "15g",
      carbohydrates: "50g",
      fat: "12g",
    },
    vegan: true,
    categories: ["Snacks", "Vegetables"],
  },
  {
    id: 7,
    recipeName: "Spicy Sev",
    servings: "Serves 4",
    description:
      "Gram flour flakes flavored with ajowan seeds, asafoetida, and salt, deep-fried to a crispy texture.",
    ingredients: [
      "500g/1lb 2oz besan*",
      "1 tsp ajowan seeds",
      "1 tbsp refined vegetable oil plus extra for deep frying",
      "¼ tsp asafoetida",
      "Salt to taste",
      "200ml/7fl oz water",
    ],
    procedure:
      "1. Knead the besan with the ajowan seeds, oil, asafoetida, salt and water into a sticky dough. 2. Put the dough in a piping bag. 3. Heat the oil in a saucepan. Press the dough through the nozzle in the form of noodles into the pan and fry lightly on both sides. 4. Drain well and cool before storing. NOTE: This can be stored for a fortnight.",
    estimatedTime: "45 minutes",
    calories: " 250-300 per serving",
    nutritionalInfo: {
      protein: "10g",
      carbohydrates: "30g",
      fat: "12g",
    },
    vegan: true,
    categories: ["Snacks"],
  },
];

export default function Home() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { user } = useUser();
  const scrollViewRef = useRef<ScrollView>(null);

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
      <SignedIn>
        <ScrollView
          ref={scrollViewRef}
          className="bg-gray-950/90
flex-1  "
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-12">
            {/* Header */}
            <View>
              <Text className="text-white text-2xl font-semibold mb-2">
                Hello, {user?.firstName || "Chef"}! 👋
              </Text>
              <Text className="text-gray-400 text-base mb-6">
                What would you like to cook today?
              </Text>
            </View>

            {/* Quick Meal Type Selection */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 px-4 mb-6"
            >
              {mealTypes.map((type, index) => (
                <TouchableOpacity
                  key={type.label}
                  className={`bg-white/5 backdrop-blur-md rounded-2xl p-3 w-24 items-center ${
                    index !== mealTypes.length - 1 ? "mr-3" : ""
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="bg-white/10 p-2 rounded-full mb-2">
                    <Ionicons name={type.icon} size={20} color="white" />
                  </View>
                  <Text className="text-white text-xs">{type.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Recipe Cards */}
            <View className="gap-y-4">
              {RECIPES.map((recipe) => (
                <TouchableOpacity
                  key={recipe.id}
                  onPress={() => toggleExpand(recipe.id)}
                  activeOpacity={0.7}
                  className={`bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden ${
                    expandedId === recipe.id ? "mb-6" : ""
                  }`}
                >
                  {/* Card Header */}
                  <View className="p-4">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-white text-xl font-semibold mb-2">
                          {recipe.recipeName}
                        </Text>
                        <Text className="text-gray-400 text-sm mb-3">
                          {recipe.description}
                        </Text>
                      </View>
                      {recipe.vegan && (
                        <View className="bg-green-500/20 px-3 py-1 rounded-full ml-2">
                          <Text className="text-green-400 text-xs font-medium">
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
                          size={16}
                          color="#9CA3AF"
                        />
                        <Text className="text-orange-400 text-sm ml-1">
                          {recipe.estimatedTime}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="flame-outline"
                          size={16}
                          color="#9CA3AF"
                        />
                        <Text className="text-orange-400 text-sm ml-1">
                          {recipe.calories} cal
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="people-outline"
                          size={16}
                          color="#9CA3AF"
                        />
                        <Text className="text-orange-400 text-sm ml-1">
                          Serves{recipe.servings}
                        </Text>
                      </View>
                    </View>

                    {/* Expand/Collapse Icon */}
                    <View className="absolute right-4 bottom-4">
                      <Ionicons
                        name={
                          expandedId === recipe.id
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={20}
                        color="#9CA3AF"
                      />
                    </View>
                  </View>

                  {/* Expanded Content */}
                  {expandedId === recipe.id && (
                    <View className="p-4 bg-white/[0.02]">
                      <View className="h-px bg-white/10 mb-4" />

                      {/* Categories */}
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-4 -mx-4 px-4"
                      >
                        {recipe.categories.map((category, index) => (
                          <View
                            key={category}
                            className={`bg-blue-700/60 px-3 py-1 rounded-full ${
                              index !== recipe.categories.length - 1
                                ? "mr-2"
                                : ""
                            }`}
                          >
                            <Text className="text-white text-xs">
                              {category}
                            </Text>
                          </View>
                        ))}
                      </ScrollView>

                      {/* Nutritional Info */}
                      <View className="flex-row justify-between mb-6 bg-white/5 p-3 rounded-xl">
                        {Object.entries(recipe.nutritionalInfo).map(
                          ([key, value]) => (
                            <View key={key} className="items-center px-2">
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
                      <Text className="text-white text-lg font-semibold mb-3">
                        Ingredients
                      </Text>
                      <View className="mb-6 space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <View key={index} className="flex-row items-center">
                            <View className="w-2 h-2 rounded-full bg-white/30 mr-3 mt-1" />
                            <Text className="text-gray-400 text-sm flex-1">
                              {ingredient}
                            </Text>
                          </View>
                        ))}
                      </View>

                      {/* Procedure */}
                      <Text className="text-white text-lg font-semibold mb-3">
                        Procedure
                      </Text>
                      <Text className="text-gray-400 text-sm leading-6">
                        {recipe.procedure}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SignedIn>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
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
