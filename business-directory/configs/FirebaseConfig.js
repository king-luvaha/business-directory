// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoG-hHsE6kAXrbOTY2ELlIQbQRg6twmms",
  authDomain: "business-directory-app-254.firebaseapp.com",
  projectId: "business-directory-app-254",
  storageBucket: "business-directory-app-254.appspot.com",
  messagingSenderId: "947367128263",
  appId: "1:947367128263:web:64bbbdc9c8274c145ae2e2",
  measurementId: "G-R4R9R5TZ6X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);