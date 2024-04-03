// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzap69fLya3UleINtrYIT3BurL9JLxKxo",
  authDomain: "aafil-firebase.firebaseapp.com",
  projectId: "aafil-firebase",
  storageBucket: "aafil-firebase.appspot.com",
  messagingSenderId: "587373325506",
  appId: "1:587373325506:web:0c208d0a9528053cdf1f5b",
  measurementId: "G-LXLSDC9S40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication persistence set to LOCAL.");
  })
  .catch((error) => {
    console.error("Error setting authentication persistence:", error);
  });

export default app;
