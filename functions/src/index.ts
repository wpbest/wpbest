import cors from 'cors';
import { initializeApp } from 'firebase-admin/app';
import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';

initializeApp();

const googleApiKey = defineSecret('GOOGLE_API_KEY');

const corsMiddleware = cors({ origin: true, credentials: true });

export const speak = onRequest(
  { secrets: [googleApiKey] },
  (req, res) => {
    corsMiddleware(req, res, async () => {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      console.log("Request Headers:", JSON.stringify(req.headers));
      console.log("Request Body:", JSON.stringify(req.body));
      console.log("Request Body Type:", typeof req.body);

      const text = req.body.text || req.body.data?.text; // Handle potential wrapping by some clients
      if (!text) {
        res.status(400).send(`Bad Request: Missing 'text' in body. Body: ${JSON.stringify(req.body)}`);
        return;
      }

      try {
        console.log("Attempting to synthesize speech for text:", text);
        const apiKey = googleApiKey.value();

        const response = await fetch(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text: text },
              voice: { languageCode: "en-US", ssmlGender: 'FEMALE', name: 'en-US-Neural2-F' },
              audioConfig: { audioEncoding: "MP3" },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("TTS API Error:", errorData);
          res.status(response.status).send(`TTS API Error: ${errorData}`);
          return;
        }

        const data = await response.json();
        const audioContent = data.audioContent;

        if (audioContent) {
          // REST API returns base64 string. Convert to buffer.
          const buffer = Buffer.from(audioContent, 'base64');
          res.set("Content-Type", "audio/mpeg");
          res.status(200).send(buffer);
        } else {
          res.status(500).send("Internal Server Error: Audio content is null.");
        }
      } catch (error) {
        console.error("ERROR:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

export const invokeLLM = onRequest(
  {
    timeoutSeconds: 300,
    secrets: [googleApiKey],
    // remove cors: true here to avoid platform-level conflicts with custom middleware
  },
  async (req, res) => {
    // run the CORS middleware first; it will handle OPTIONS preflight responses
    corsMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
      }

      try {
        const text = req.body?.data?.text;
        const systemInstruction = req.body?.data?.systemInstruction;

        if (!text) {
          res.status(400).json({ error: 'Missing text in request body.' });
          return;
        }

        // await the secret value
        const key = await googleApiKey.value();

        // ...existing code...
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
              contents: [{ role: 'user', parts: [{ text }] }],
            }),
          }
        );

        const data = await response.json();
        res.status(200).json(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('LLM error:', message);
        res.status(500).json({ error: message });
      }
    });
  }
);
