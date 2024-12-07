// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcu9-yCDGg9yPoXlo9ZrvHEvQuNMT-lU8",
  authDomain: "vibesmatch-aad66.firebaseapp.com",
  projectId: "vibesmatch-aad66",
  storageBucket: "vibesmatch-aad66.firebasestorage.app",
  messagingSenderId: "202076571890",
  appId: "1:202076571890:web:33666fb68079d61627686b",
  measurementId: "G-147F4QKF3Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);