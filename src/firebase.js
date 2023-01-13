// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsWEBhWN2Qrwesgd-BdQJmNmVxklnt7AQ",
  authDomain: "challengegreydive-16ee1.firebaseapp.com",
  projectId: "challengegreydive-16ee1",
  storageBucket: "challengegreydive-16ee1.appspot.com",
  messagingSenderId: "252535109116",
  appId: "1:252535109116:web:df6176cd68eb6b95d5ae79",
  measurementId: "G-XMPFJ23BFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);