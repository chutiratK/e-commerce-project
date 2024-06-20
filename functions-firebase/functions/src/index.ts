/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   console.log("haii");
//   response.send("Hello from kkk!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

const serviceAccount = require("../service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://nuxt-firebase-auth-6c26b-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const allowCors = (req: any, res: any, next: any) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status(200).send("OK");
  } else {
    next();
  }
};

export const authenticateWithLine = functions.https.onRequest((req, res) => {
  allowCors(req, res, () => {
    const body = req.body;

    verifyLineToken(body)
      .then((firebaseToken) => {
        res.status(200).json({ token: firebaseToken });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
});

function verifyLineToken(body: any): Promise<string> {
  return axios
    .get(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${body.access_token}`
    )
    .then((response: any) => {
      if (response.data.client_id !== functions.config().line.channelid) {
        throw new Error("LINE channel ID mismatched");
      }
      return getFirebaseUser(body);
    })
    .then((userRecord: admin.auth.UserRecord) => {
      return admin.auth().createCustomToken(userRecord.uid);
    })
    .then((token: string) => {
      return token;
    });
}

function getFirebaseUser(body: any): Promise<admin.auth.UserRecord> {
  const firebaseUid = `line:${body.id}`;

  return admin
    .auth()
    .getUser(firebaseUid)
    .then(function (userRecord: admin.auth.UserRecord) {
      return userRecord;
    })
    .catch((error: any) => {
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: firebaseUid,
          displayName: body.name,
          photoURL: body.picture,
          email: body.email,
        });
      }
      return Promise.reject(error);
    });
}
