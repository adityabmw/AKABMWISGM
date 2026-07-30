import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
  authDomain: "akabmwisgm.firebaseapp.com",
  projectId: "akabmwisgm",
  storageBucket: "akabmwisgm.firebasestorage.app",
  messagingSenderId: "317584647702",
  appId: "1:317584647702:web:8d7b6dbd9334f973eeb737"
};

const App = initializeApp(firebaseConfig);

const Auth = getAuth(App);
const DB = getFirestore(App);
const Storage = getStorage(App);
const Functions = getFunctions(App);

export { App, Auth, DB, Storage, Functions };
