// ============================================================
// FIREBASE INITIALIZATION — AKA BMW ISGM
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
  authDomain: "akabmwisgm.firebaseapp.com",
  projectId: "akabmwisgm",
  storageBucket: "akabmwisgm.firebasestorage.app",
  messagingSenderId: "317584647702",
  appId: "1:317584647702:web:8d7b6dbd9334f973eeb737",
  measurementId: "G-DVB1P9HW3M"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true })
  .then(() => console.log('🔥 Firestore persistence enabled'))
  .catch((err) => console.warn('Firestore persistence warning:', err));

window.__firebase = { auth, db };
auth.languageCode = 'id';
console.log('🔥 Firebase initialized successfully');
