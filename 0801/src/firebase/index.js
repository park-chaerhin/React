import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-NxbaTr-PR01cbA2fGzFJuXufZ5TOS4M",
    authDomain: "reactproject-37da6.firebaseapp.com",
    projectId: "reactproject-37da6",
    storageBucket: "reactproject-37da6.appspot.com",
    messagingSenderId: "911301820755",
    appId: "1:911301820755:web:4522b749f6c18c90c161a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);