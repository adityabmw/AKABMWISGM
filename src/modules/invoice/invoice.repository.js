import { DB } from "../../config/firebase.config.js";
import {
collection,
doc,
getDocs,
getDoc,
addDoc,
updateDoc,
deleteDoc
} from "firebase/firestore";

const COLLECTION="invoice";

class InvoiceRepository{

async getAll(){

const snap=await getDocs(collection(DB,COLLECTION));

return snap.docs.map(d=>({
id:d.id,
...d.data()
}));

}

async get(id){

const snap=await getDoc(doc(DB,COLLECTION,id));

if(!snap.exists()) return null;

return{
id:snap.id,
...snap.data()
};

}

async create(data){

const ref=await addDoc(collection(DB,COLLECTION),{
...data,
createdAt:new Date().toISOString()
});

return ref.id;

}

async update(id,data){

await updateDoc(doc(DB,COLLECTION,id),{
...data,
updatedAt:new Date().toISOString()
});

return true;

}

async delete(id){

await deleteDoc(doc(DB,COLLECTION,id));

return true;

}

}

export default new InvoiceRepository();
