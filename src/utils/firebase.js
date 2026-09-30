import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
  authDomain: "akabmwisgm.firebaseapp.com",
  projectId: "akabmwisgm",
  storageBucket: "akabmwisgm.firebasestorage.app",
  messagingSenderId: "317584647702",
  appId: "1:317584647702:web:8d7b6dbd9334f973eeb737"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default { db, auth, app };
