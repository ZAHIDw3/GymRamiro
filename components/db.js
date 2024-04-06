// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0vW_Uba5XVSfRmptyyiDqlV97DKQL4E0",
  authDomain: "gymramiro-c07d8.firebaseapp.com",
  projectId: "gymramiro-c07d8",
  storageBucket: "gymramiro-c07d8.appspot.com",
  messagingSenderId: "842394046367",
  appId: "1:842394046367:web:d6394463b7227c0c9cb7aa",
  measurementId: "G-6DBB7RKBZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);