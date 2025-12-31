// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv5ubE_a5JvmdvY3M_fQUfs0TxtJZah-E",
  authDomain: "gift-list-d390a.firebaseapp.com",
  projectId: "gift-list-d390a",
  storageBucket: "gift-list-d390a.firebasestorage.app",
  messagingSenderId: "156908986302",
  appId: "1:156908986302:web:9f1981e190b41d86bea3ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
