import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALp4cYyzGFOtpwL1wHKf4ld7RBSz1mZ6s",
    authDomain: "foodforthought-d273b.firebaseapp.com",
    projectId: "foodforthought-d273b",
    storageBucket: "foodforthought-d273b.appspot.com",
    messagingSenderId: "173503155250",
    appId: "1:173503155250:web:aba497723fed1b8919402b",
    measurementId: "G-HY9V08KHK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
