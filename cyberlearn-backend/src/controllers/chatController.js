import { GoogleGenerativeAI } from "@google/generative-ai";
import SYSTEM_PROMPT from "../config/systemPrompt.js";

const buildPrompt = (history, newMessage) => {
  const conversation = history
    .map(m => `${m.from === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  return `${SYSTEM_PROMPT}\n\n${conversation}\nUser: ${newMessage}\nAssistant:`;
};

export const chat = async (req, res) => {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ success: false, error: "API key not found. Check .env configuration." });
    }

    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const recentHistory = history.slice(-10);
    const fullPrompt = buildPrompt(recentHistory, message.trim());

    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();

    return res.json({ success: true, reply });

  } catch (error) {
    // ✅ Full error exposed for debugging
    console.error("FULL GEMINI ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unknown error"
    });
  }
};
