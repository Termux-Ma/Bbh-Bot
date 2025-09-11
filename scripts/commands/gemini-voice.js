// gemini-voice.js
import fetch from "node-fetch";
import googleTTS from "google-tts-api";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function bbhVoice(prompt, lang = "bn") {
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
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ BBH AI কিছু বলতে পারলো না।";

    const audioUrl = googleTTS.getAudioUrl(text, {
      lang: lang,
      slow: false,
      host: "https://translate.google.com",
    });

    return { text, audioUrl };
  } catch (err) {
    console.error("BBH AI Voice Error:", err);
    return null;
  }
}
