import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const geminiApiKey = defineSecret("GEMINI_API_KEY");

export const invokeLLM = onRequest(
  {
    timeoutSeconds: 300,
    secrets: [geminiApiKey],
  },
  async (req, res) => {
    // --- Manual CORS handling ---
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins temporarily
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    // Only allow POST
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const text = req.body?.data?.text;
      if (!text) {
        res.status(400).json({ error: "Missing text in request body." });
        return;
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiApiKey.value()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text }] }],
          }),
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("LLM error:", message);
      res.status(500).json({ error: message });
    }
  }
);
