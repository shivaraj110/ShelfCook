import { GoogleGenAI } from "@google/genai";
import * as FileSystem from "expo-file-system";

if (!process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const ai = new GoogleGenAI({ 
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY
});

export const getIngredients = async (imageUri: string) => {
  try {
    const base64ImageFile = await FileSystem.readAsStringAsync(imageUri, {
      encoding: "base64",
    });

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "identify the objects in the image" },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction:
          "You are a helpful assistant lists out all the objects in the image in the format as stringified array. Avoid adding any extra details to the response.",
      },
    });

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!result) {
      throw new Error("No response from API");
    }

    return JSON.parse(result) as string[];
  } catch (error) {
    console.error("Error identifying ingredients:", error);
    return [];
  }
};
