import cors from 'cors';
import { initializeApp } from 'firebase-admin/app';
import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';

initializeApp();

const geminiApiKey = defineSecret('GEMINI_API_KEY');

const corsMiddleware = cors({ origin: true, credentials: true });

export const invokeLLM = onRequest(
  {
    timeoutSeconds: 300,
    secrets: [geminiApiKey],
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
        if (!text) {
          res.status(400).json({ error: 'Missing text in request body.' });
          return;
        }

        // await the secret value
        const key = await geminiApiKey.value();

        // ...existing code...
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
