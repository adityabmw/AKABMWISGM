import {

getAuth,

signInWithEmailAndPassword,

signOut

} from "firebase/auth";

const auth=getAuth();

export async function login(email,password){

return await signInWithEmailAndPassword(auth,email,password);

}

export async function logout(){

return await signOut(auth);

}
