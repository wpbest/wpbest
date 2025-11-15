/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";

initializeApp();

export const getGeminiKey = onCall(
  {
    maxInstances: 10,
    secrets: ["GEMINI_API_KEY"],
  },
  (_request) => {
    // TODO: Add authentication and authorization checks
    // if (!request.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new HttpsError("failed-precondition", "The function must be " +
    //     "called while authenticated.");
    // }
    return {key: process.env.GEMINI_API_KEY};
  },
);

