import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",

    authDomain: "akabmwisgm.firebaseapp.com",

    projectId: "akabmwisgm",

    storageBucket: "akabmwisgm.firebasestorage.app",

    messagingSenderId: "317584647702",

    appId: "1:317584647702:web:8d7b6dbd9334f973eeb737",

    measurementId: "G-DVB1P9HW3M"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
    app,
    auth,
    db
};