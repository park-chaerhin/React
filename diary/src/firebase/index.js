import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const oFirebase = firebase.initializeApp({
    apiKey: "AIzaSyAtVktwW81ymAkR2anamaGyje9BF1-QTYY",
    authDomain: "capturenote-54bc2.firebaseapp.com",
    databaseURL: "https://capturenote-54bc2-default-rtdb.firebaseio.com",
    projectId: "capturenote-54bc2",
    storageBucket: "capturenote-54bc2.appspot.com",
    messagingSenderId: "1004451932995",
    appId: "1:1004451932995:web:189c8b0d75c3324af49df6"
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig); // oFirebase = app

// firestore database
export const db = getFirestore(oFirebase);

// firebase db객체 연결
const oDB = oFirebase.database();

// DB객체 중 pictures 항목 공개
export const oPicturesinDB = oDB.ref('pictures');

// firebase storage 객체 공개
export const oStorage = oFirebase.storage();
