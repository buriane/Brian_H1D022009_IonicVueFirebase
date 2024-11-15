// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDekzxDl-jCwyf5BXIKZL3cpgBA6xJ_Cro",
    authDomain: "vue-firebase-c46ed.firebaseapp.com",
    projectId: "vue-firebase-c46ed",
    storageBucket: "vue-firebase-c46ed.firebasestorage.app",
    messagingSenderId: "175325517741",
    appId: "1:175325517741:web:cd5e5c69da178c8e10b324"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };