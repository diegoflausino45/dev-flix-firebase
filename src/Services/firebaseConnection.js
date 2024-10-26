import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSr_O9RHE9uVp4puXiIWIwCgpJIiFjfqo",
    authDomain: "curso-f0f80.firebaseapp.com",
    projectId: "curso-f0f80",
    storageBucket: "curso-f0f80.appspot.com",
    messagingSenderId: "718174337093",
    appId: "1:718174337093:web:cc3c8780abc8389b59cb2c",
    measurementId: "G-5GR9NH89FV"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export {db}

