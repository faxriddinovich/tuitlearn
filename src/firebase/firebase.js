import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_jaJa-SQci8RaxP6UZ2RQ8Tbx7AFPtUc",
    authDomain: "samtuit-edu.firebaseapp.com",
    projectId: "samtuit-edu",
    storageBucket: "samtuit-edu.appspot.com",
    messagingSenderId: "614035712593",
    appId: "1:614035712593:web:a3e6503c762550cf606670",
    measurementId: "G-9ZQYES8820"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()