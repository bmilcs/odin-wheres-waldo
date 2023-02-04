import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  getFunctions,
  httpsCallable,
  // connectFunctionsEmulator,
} from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyABzNK-oeIQdF0ZrqZGxca9avUGzMNUXmw",
  authDomain: "odin-wheres-waldo-a12f6.firebaseapp.com",
  projectId: "odin-wheres-waldo-a12f6",
  storageBucket: "odin-wheres-waldo-a12f6.appspot.com",
  messagingSenderId: "128540815863",
  appId: "1:128540815863:web:b6ef8fb372fd0d5d7fbef2",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const db = getFirestore(app);

// FUNCTION EMULATION
// connectFunctionsEmulator(functions, "localhost", 5001);

// CLOUD FUNCTIONS

export const validateCharacterPosition = httpsCallable(
  functions,
  "validateCharacterPosition"
);

export const saveToLeaderboard = httpsCallable(functions, "saveToLeaderboard");

// LOCAL FUNCTIONS

export interface LeaderboardEntry {
  name: string;
  time: number;
}

export const getLeaderboardData = async (levelID: string) => {
  try {
    // retrieve scores from db: "/levels/{levelName}/scores"
    const docRef = doc(db, "levels", levelID);
    const snapshot = await getDoc(docRef);
    const data = await snapshot.data();
    if (!data || !data.scores) return;
    const scores: LeaderboardEntry[] = data.scores;
    return scores.sort((a, b) => {
      return a.time > b.time ? 1 : -1;
    });
  } catch {
    console.log("error");
  }
};
