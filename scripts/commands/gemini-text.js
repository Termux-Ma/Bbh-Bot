// gemini-text.js
import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function bbhText(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ BBH AI উত্তর দিতে পারলো না।";
  } catch (err) {
    console.error("BBH AI Text Error:", err);
    return "⚠️ Gemini API তে সমস্যা হয়েছে।";
  }
}
