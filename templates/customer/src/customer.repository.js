import {
collection,
addDoc,
getDocs,
getDoc,
updateDoc,
deleteDoc,
doc,
query,
where,
limit
} from "firebase/firestore";
import {DB} from "../../config/firebase.config.js";

const COL="customers";

class CustomerRepository{

async all(){
const snap=await getDocs(collection(DB,COL));
return snap.docs.map(d=>({id:d.id,...d.data()}));
}

async find(id){
const snap=await getDoc(doc(DB,COL,id));
if(!snap.exists()) return null;
return {id:snap.id,...snap.data()};
}

async create(data){
const ref=await addDoc(collection(DB,COL),data);
return ref.id;
}

async update(id,data){
await updateDoc(doc(DB,COL,id),data);
return true;
}

async delete(id){
await deleteDoc(doc(DB,COL,id));
return true;
}

async phoneExists(phone){
const q=query(collection(DB,COL),where("phone","==",phone),limit(1));
const snap=await getDocs(q);
return !snap.empty;
}

}

export default new CustomerRepository();
