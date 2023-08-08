import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtVktwW81ymAkR2anamaGyje9BF1-QTYY",
    authDomain: "capturenote-54bc2.firebaseapp.com",
    projectId: "capturenote-54bc2",
    storageBucket: "capturenote-54bc2.appspot.com",
    messagingSenderId: "1004451932995",
    appId: "1:1004451932995:web:189c8b0d75c3324af49df6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);