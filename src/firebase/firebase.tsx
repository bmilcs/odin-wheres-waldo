import { initializeApp } from "firebase/app";
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

// LIVE VERSION:

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// LOCAL TEST VERSION:

// connectFunctionsEmulator(functions, "localhost", 5001);

export const validateCharacterPosition = httpsCallable(
  functions,
  "validateCharacterPosition"
);
