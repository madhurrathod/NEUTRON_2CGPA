// src/api/generatePrompts.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API_KEY);

export const generatePrompts = async (prompt) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Return the generated text
    return response.text();
  } catch (error) {
    console.error("Detailed error:", error);
    if (error.message.includes("API key")) {
      throw new Error("Please check your Gemini API key in the environment variables");
    } else if (error.message.includes("404")) {
      throw new Error("Model not found. Please check if you have access to the Gemini API");
    } else {
      throw new Error(`Error generating content: ${error.message}`);
    }
  }
};




