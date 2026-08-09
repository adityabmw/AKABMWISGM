import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth,(user)=>{
    console.log("===== FIREBASE AUTH =====");
    console.log(user);
});
