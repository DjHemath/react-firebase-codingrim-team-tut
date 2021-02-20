import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBsJsv3xHBxPlkoZ3ALJoty38iWKA37_xw",
    authDomain: "codingrim-audit-dev.firebaseapp.com",
    projectId: "codingrim-audit-dev",
    storageBucket: "codingrim-audit-dev.appspot.com",
    messagingSenderId: "796753200196",
    appId: "1:796753200196:web:8a39cd1093367038072811",
    measurementId: "G-M7V02S2937"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();