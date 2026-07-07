import {

getFirestore,

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc

} from "firebase/firestore";

export const db=getFirestore();

export{

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc

};
