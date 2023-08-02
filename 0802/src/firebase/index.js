import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYPcuXZpOtmOjEsaB8rfpYhg8O0Q-MB14",
    authDomain: "to-do-be1b2.firebaseapp.com",
    databaseURL: "https://to-do-be1b2-default-rtdb.firebaseio.com",
    projectId: "to-do-be1b2",
    storageBucket: "to-do-be1b2.appspot.com",
    messagingSenderId: "490413887139",
    appId: "1:490413887139:web:0d05c26b43fd73a5cb3916"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);