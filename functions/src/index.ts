import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// admin sdk to access firestore
admin.initializeApp();

export const validateCharacterPosition = functions.https.onCall(
  (data, context) => {
    const levelID = data.levelID;
    const characterName = data.characterName;
    const coordinates = data.coordinates;
    let isFound: boolean | null = null;

    const db = admin.firestore();
    return db
      .collection("levels")
      .doc(levelID)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data === undefined) throw new Error("Something went wrong!");
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
