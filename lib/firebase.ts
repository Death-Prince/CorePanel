// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHE6i32FGDUorauHzc0lWYwz2r74A7wCU",
  authDomain: "stackshelf-auth.firebaseapp.com",
  projectId: "stackshelf-auth",
  storageBucket: "stackshelf-auth.appspot.com",
  messagingSenderId: "19299320957",
  appId: "1:19299320957:web:d3ed4dee13884a19201d14",
  measurementId: "G-LL5VVEJP01",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
