// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "unimart-93832.firebaseapp.com",
  projectId: "unimart-93832",
  storageBucket: "unimart-93832.appspot.com",
  messagingSenderId: "368486674480",
  appId: "1:368486674480:web:fd36f1e6bf7b2e968a7df5",
  measurementId: "G-R7D6ELMBKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);