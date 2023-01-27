import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

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

export const validateCharacterPosition = httpsCallable(
  functions,
  "validateCharacterPosition"
);
