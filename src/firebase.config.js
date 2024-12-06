// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
// const analytics = getAnalytics(app);