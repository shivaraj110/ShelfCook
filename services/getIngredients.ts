import { GoogleGenAI } from "@google/genai";

import * as fs from "node:fs";

const ai = new GoogleGenAI({});
const base64ImageFile = fs.readFileSync("./veggies.jpeg", {
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

const getItems = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:
        "You are a helpful assistant lists out all the objects in the image in the format as stringified array. Avoid adding any extra details to the response.",
    },
  });

  return JSON.stringify(response.text);
};

const items = await getItems();
export const ingredients: string[] = JSON.parse(items);
