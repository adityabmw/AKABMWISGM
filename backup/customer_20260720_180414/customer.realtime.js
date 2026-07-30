import {collection,onSnapshot} from "firebase/firestore";
import {DB} from "../../config/firebase.config.js";

export function listenCustomer(callback){
return onSnapshot(collection(DB,"customers"),callback);
}
