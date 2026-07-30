import {
collection,
getDocs,
getDoc,
doc,
addDoc,
updateDoc,
query,
where,
limit
} from "firebase/firestore";

import { DB } from "../../config/firebase.config.js";

const COL="customers";

class CustomerRepository{

async getAll(){

const snap=await getDocs(collection(DB,COL));

return snap.docs.map(d=>({
id:d.id,
...d.data()
}));

}

async get(id){

const snap=await getDoc(doc(DB,COL,id));

if(!snap.exists()) return null;

return{
id:snap.id,
...snap.data()
};

}

async create(data){

const ref=await addDoc(collection(DB,COL),data);

return ref.id;

}

async update(id,data){

await updateDoc(doc(DB,COL,id),data);

return true;

}

async softDelete(id){

await updateDoc(doc(DB,COL,id),{
active:false,
deletedAt:new Date().toISOString()
});

return true;

}

async findByPhone(phone){

const q=query(
collection(DB,COL),
where("phone","==",phone),
limit(1)
);

const snap=await getDocs(q);

if(snap.empty) return null;

return{
id:snap.docs[0].id,
...snap.docs[0].data()
};

}

}

export default new CustomerRepository();
