import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { Auth } from "../../config/firebase.config.js";

export async function login(email,password){

    return await signInWithEmailAndPassword(
        Auth,
        email,
        password
    );

}

export async function logout(){

    return await signOut(Auth);

}

export function authListener(callback){

    return onAuthStateChanged(Auth,callback);

}
