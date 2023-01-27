import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// The Firebase Admin SDK to access Firestore.
admin.initializeApp();

// https://firebase.google.com/docs/functions/typescript

type Req = functions.https.Request;
type Res = functions.Response;

export const validateCharacterPosition = functions.https.onRequest(
  async (req: Req, res: Res) => {
    const levelID = req.query.levelID;
    console.log("🚀 ~ file: index.ts:25 ~ levelID", levelID);
    const characterName = req.query.characterName;
    console.log("🚀 ~ file: index.ts:27 ~ characterName", characterName);
    const coordinates = req.query.coordinates;
    console.log("🚀 ~ file: index.ts:29 ~ coordinates", coordinates);

    res.json({
      result: `request received: ${levelID} ${characterName} @ ${coordinates}`,
      isFound: false,
    });
  }
);
