import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as filter from "leo-profanity";

// admin sdk to access firestore
admin.initializeApp();
const db = admin.firestore();

export const validateCharacterPosition = functions.https.onCall(
  (data, context) => {
    const levelID = data.levelID;
    const characterName = data.characterName;
    const coordinates = data.coordinates;
    let isFound: boolean | null = null;

    return db
      .collection("levels")
      .doc(levelID)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data === undefined) throw new Error("Something went wrong!");

        // retrieve hitbox coordinates from database: /levels/{leveName}/{characterName}
        const topLeft = data[characterName]["topLeft"];
        const bottomRight = data[characterName]["bottomRight"];

        isFound = isWithinCoordinateRange(coordinates, topLeft, bottomRight);
        return {
          levelID,
          characterName,
          isFound,
        };
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
);

export const saveToLeaderboard = functions.https.onCall((data, context) => {
  const levelID = data.levelID;
  const entry = {
    name: filter.clean(data.name),
    time: data.time,
  };
  const fieldValue = admin.firestore.FieldValue;

  db.collection("levels")
    .doc(levelID)
    .update({
      scores: fieldValue.arrayUnion(entry),
    });
});

const isWithinCoordinateRange = (
  coordinates: number[],
  topLeft: number[],
  bottomRight: number[]
) => {
  const [clickedX, clickedY] = coordinates;
  const [topLeftX, topLeftY] = topLeft;
  const [bottomRightX, bottomRightY] = bottomRight;

  if (clickedX < topLeftX || clickedX > bottomRightX) return false;
  if (clickedY < topLeftY || clickedY > bottomRightY) return false;
  return true;
};
